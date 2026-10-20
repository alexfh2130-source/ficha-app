import mercadopago from 'mercadopago';
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const token = process.env.MP_TOKEN;
  if(!token) return res.status(500).json({error:'Falta MP_TOKEN'});
  mercadopago.configure({access_token:token});
  const {titulo,precio,email} = req.body;
  try{
    const pref = await mercadopago.preferences.create({
      items:[{title: titulo, quantity:1, unit_price:Number(precio), currency_id:'MXN'}],
      payer:{email},
      back_urls:{success:'https://ficha-mercadopago.vercel.app/success'},
      auto_return:'approved',
      notification_url:'https://ficha-mercadopago.vercel.app/api/webhook'
    });
    return res.json({url:pref.body.init_point});
  }catch(e){ return res.status(500).json({error:e.message}) }
}
