import { Invoice as InvoiceClient } from 'xendit-node';
import { PRIVATE_XENDIT_SECRETKEY } from '$env/static/private';

export const xenditInvoiceClient = new InvoiceClient({ secretKey: PRIVATE_XENDIT_SECRETKEY })