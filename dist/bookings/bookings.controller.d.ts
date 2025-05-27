import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking as BookingModel } from './schemas/booking.schema';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(dto: CreateBookingDto): Promise<BookingModel>;
    findAll(): Promise<BookingModel[]>;
    findByUser(userId: string): Promise<BookingModel[]>;
    update(id: string, dto: UpdateBookingDto): Promise<BookingModel>;
}
