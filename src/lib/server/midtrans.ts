/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import midtransClient from 'midtrans-client';
// import { PRIVATE_EDUVENTURE_MIDTRANS_MERCHANTID } from '$env/static/private';
import { PRIVATE_EDUVENTURE_MIDTRANS_SERVERKEY } from '$env/static/private';
import { PRIVATE_EDUVENTURE_MIDTRANS_CLIENTKEY } from '$env/static/private';

export const midtransCoreApi = new midtransClient.CoreApi({
  isProduction: true,
  serverKey: PRIVATE_EDUVENTURE_MIDTRANS_SERVERKEY,
  clientKey: PRIVATE_EDUVENTURE_MIDTRANS_CLIENTKEY,
})

export const midTransSnap = new midtransClient.Snap({
  isProduction: true,
  serverKey: PRIVATE_EDUVENTURE_MIDTRANS_SERVERKEY,
  clientKey: PRIVATE_EDUVENTURE_MIDTRANS_CLIENTKEY,
})