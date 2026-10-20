export default async function handler(req,res){
  console.log('Webhook:', req.body);
  // Aquí consultas el pago y sumas fichas a Firebase
  res.status(200).send('OK');
}
