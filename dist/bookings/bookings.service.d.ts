import { Model } from 'mongoose';
import { BookingDocument } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
export declare class BookingsService {
    private bookingModel;
    constructor(bookingModel: Model<BookingDocument>);
    create(dto: CreateBookingDto): Promise<BookingDocument>;
    findAll(): Promise<BookingDocument[]>;
    findByUser(userId: string): Promise<BookingDocument[]>;
    update(id: string, dto: UpdateBookingDto): Promise<BookingDocument>;
}
