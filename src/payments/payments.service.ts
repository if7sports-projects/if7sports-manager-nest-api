import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  // Crear un nuevo pago
  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = new this.paymentModel(createPaymentDto);
    return payment.save();
  }

  // Obtener todos los pagos
  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().exec();
  }

  // Obtener un pago por ID
  async findById(id: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(id).exec();
    if (!payment) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }
    return payment;
  }

  // Actualizar un pago
  async update(
    id: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const updated = await this.paymentModel
      .findByIdAndUpdate(id, updatePaymentDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }
    return updated;
  }

  // Eliminar un pago
  async remove(id: string): Promise<Payment> {
    const deleted = await this.paymentModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }
    return deleted;
  }
}
