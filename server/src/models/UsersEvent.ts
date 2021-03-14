import Joi from 'joi';
import mongoose from 'mongoose';

interface IUsersEvent extends mongoose.Document {
    coupon: mongoose.Schema.Types.ObjectId;
    state: string;
    event: mongoose.Schema.Types.ObjectId;
    betType: string;
    course: number;
}

const usersEventSchema = new mongoose.Schema({
    coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
        required: true
    },
    state: {
        type: String,
        default: 'pending'
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventId',
        required: true
    },
    betType: {
        type: String,
        require: true
    },
    course: {
        type: Number,
        require: true
    }
});

const UsersEvent = mongoose.model<IUsersEvent>('UsersEvent', usersEventSchema);

function validateUsersEvent(usersEvent: typeof UsersEvent): Joi.ValidationResult {
    const schema = Joi.object({
        coupon: Joi.string().required(),
        state: Joi.string().required(),
        event: Joi.string().required(),
        betType: Joi.string().required(),
        course: Joi.number().required()
    });

    return schema.validate(usersEvent);
}

export { UsersEvent, validateUsersEvent };
