/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import midtransClient from 'midtrans-client';
// import { PRIVATE_KANDAGA_MIDTRANS_MERCHANTID } from '$env/static/private';
import { PRIVATE_KANDAGA_MIDTRANS_SERVERKEY } from '$env/static/private';
import { PRIVATE_KANDAGA_MIDTRANS_CLIENTKEY } from '$env/static/private';

export const midtransCoreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: PRIVATE_KANDAGA_MIDTRANS_SERVERKEY,
  clientKey: PRIVATE_KANDAGA_MIDTRANS_CLIENTKEY,
})

export const midTransSnap = new midtransClient.Snap({
  isProduction: false,
  serverKey: PRIVATE_KANDAGA_MIDTRANS_SERVERKEY,
  clientKey: PRIVATE_KANDAGA_MIDTRANS_CLIENTKEY,
})