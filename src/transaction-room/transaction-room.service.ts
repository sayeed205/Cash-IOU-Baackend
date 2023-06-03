import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaginationResDto } from 'src/common/dto';
import { User } from '../auth/schemas/user.schema';
import { TransactionRoom } from './schemas';

@Injectable()
export class TransactionRoomService {
    constructor(
        @InjectModel(TransactionRoom.name)
        private readonly transactionRoomModel: Model<TransactionRoom>,
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) {}

    async createTransactionRoom(roomInfo: {
        id: Types.ObjectId;
        name: string;
        phone: string;
    }) {
        const { id, name, phone } = roomInfo;

        // Find if a user exists in the db with the given phone number
        const userExists = await this.userModel.findOne({ phone });

        // If user exists, check if transaction room exists
        if (userExists) {
            const transactionRoomExists =
                await this.transactionRoomModel.findOne({
                    members: { $all: [id, userExists._id] },
                });
            console.log('transactionRoomExists', transactionRoomExists);

            // If transaction room exists, and check roomDetails for the user
            if (transactionRoomExists) {
                const userExistsInRoomDetails =
                    transactionRoomExists.roomDetails.filter(el =>
                        id.equals(el.userId),
                    );

                // If user exists in roomDetails, return the transaction room
                if (userExistsInRoomDetails.length > 0)
                    return transactionRoomExists;

                // If user doesn't exist in roomDetails, add user to roomDetails
                transactionRoomExists.roomDetails.push({
                    userId: id,
                    name,
                    // TODO)): add user's profile picture
                });

                // Save the transaction room
                await transactionRoomExists.save();

                // Return the transaction room
                return transactionRoomExists;
            }

            // If transaction room doesn't exist, create it
            const newTransactionRoom = await this.transactionRoomModel.create({
                members: [id, userExists._id],
                roomDetails: [{ userId: id, name }], // TODO)): add user's profile picture
            });

            // Return the transaction room
            return newTransactionRoom;
        }

        // If user doesn't exist, create a new user with the given phone number
        const newUser = await this.userModel.create({ phone });

        // Create a new transaction room with the new user and the given user
        const newTransactionRoom = await this.transactionRoomModel.create({
            members: [id, newUser._id],
            roomDetails: [{ userId: id, name }], // TODO)): add user's profile picture
        });

        // Return the transaction room
        return newTransactionRoom;
    }

    async getAllTransactionRooms(
        id: Types.ObjectId,
        { page, limit }: { page: number; limit: number },
    ): Promise<PaginationResDto<TransactionRoom>> {
        // {
        //     "_id": "6460b71dd930d70d3b6d3e3f",
        //     "members": [
        //       "6460b70dd930d70d3b6d3e39",
        //       "6460b71dd930d70d3b6d3e3d"
        //     ],
        //     "roomDetails": [
        //       {
        //         "userId": "6460b70dd930d70d3b6d3e39",
        //         "name": "Raj Da"
        //       },
        //       {
        //         "userId": "6460b71dd930d70d3b6d3e3d",
        //         "name": "Sayeed"
        //       }
        //     ],
        //     "createdAt": "2023-05-14T10:25:33.059Z",
        //     "updatedAt": "2023-05-15T01:07:15.049Z",
        //     "__v": 9
        //   },

        const aggregateOptions = [
            {
                $match: {
                    members: { $in: [id] },
                },
            },
            {
                $addFields: {
                    name: {
                        $filter: {
                            input: '$roomDetails',
                            as: 'roomDetail',
                            cond: { $eq: ['$$roomDetail.userId', id] },
                        },
                    },
                },
            },
            {
                $addFields: {
                    image: {
                        $filter: {
                            input: '$roomDetails',
                            as: 'roomDetail',
                            cond: { $eq: ['$$roomDetail.userId', id] },
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    name: { $arrayElemAt: ['$name.name', 0] },
                    image: { $arrayElemAt: ['$image.image', 0] },
                },
            },
        ];

        const transactionRooms = await this.transactionRoomModel.aggregate([
            ...aggregateOptions,
            {
                $limit: limit,
            },
            {
                $skip: (page - 1) * limit,
            },
            // {
            //     $sort: {
            //         "lastTransaction.createdAt": -1
            //     }
            // }
        ]); // TODO)): add last transaction details

        const total = await this.transactionRoomModel.countDocuments(
            aggregateOptions,
        );

        // Return the transaction rooms
        return {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
            results: transactionRooms,
        };
    }
}
