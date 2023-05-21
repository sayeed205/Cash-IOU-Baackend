import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Document } from 'mongoose';

@Schema()
class token {
    @Prop()
    value: string;

    @Prop()
    expiry: Date;
}

@Schema()
class oauth {
    @Prop()
    provider: string;

    @Prop()
    id: string;

    @Prop()
    generatedOn: Date;
}

@Schema({ timestamps: true })
export class User extends Document {
    @Prop()
    name: string;

    @Prop({ unique: true, required: true, trim: true })
    phone: string;

    @Prop()
    password: string;

    @Prop()
    avatar: string;

    @Prop({ _id: false, type: token })
    otp: token;

    @Prop({ _id: false, type: token })
    token: token;

    @Prop()
    oauth: oauth[];

    @Prop({ default: false })
    phoneVerified: boolean;

    @Prop()
    signedUpOn: Date;

    @Prop({ default: false })
    isReal: boolean;

    // Define instance methods
    async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = async function (
    password: string,
): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};
