
import { useState, useEffect } from 'react'

const FRASE_EXACTA = "Acepto que compro fichas virtuales SIN VALOR REAL, no canjeables por dinero, solo para entretenimiento +18. No es apuesta con dinero real. Compra final, sin reembolsos. Juego responsable"

const PARTIDOS = [
  { id:1, local:'América', visita:'Chivas', hora:'19:00', momios:{local:2.1, empate:3.2, visita:3.0} },
  { id:2, local:'Cruz Azul', visita:'Pumas', hora:'21:00', momios:{local:2.4, empate:3.0, visita:2.8} },
  { id:3, local:'Tigres', visita:'Monterrey', hora:'19:30', momios:{local:2.2, empate:3.1, visita:3.2} },
  { id:4, local:'Toluca', visita:'León', hora:'17:00', momios:{local:1.9, empate:3.4, visita:3.8} },
]

const PAQUETES = [
  { fichas:500, precio:19, tag:'' },
  { fichas:1750, precio:49, tag:'' },
  { fichas:4000, precio:99, tag:'MÁS POPULAR' },
  { fichas:10000, precio:199, tag:'MEJOR VALOR' },
  { fichas:30000, precio:499, tag:'BALLENA' },
]

export default function App(){
  const [user, setUser] = useState(()=>{ try{ return JSON.parse(localStorage.getItem('ficha_user')) }catch{ return null } })
  const [form, setForm] = useState({nombre:'', email:'', edad:''})
  const [c1, setC1] = useState(false)
  const [c2, setC2] = useState(false)
  const [saldo, setSaldo] = useState(1000)
  const [tab, setTab] = useState('partidos')
  const [apuestas, setApuestas] = useState([])
  const [sel, setSel] = useState(null)
  const [monto, setMonto] = useState(100)
  const [showPay, setShowPay] = useState(null)
  const [showTyc, setShowTyc] = useState(false)
  const [errorEdad, setErrorEdad] = useState('')

  useEffect(()=>{ if(user) localStorage.setItem('ficha_user', JSON.stringify(user)) },[user])

  const registrar = () => {
    if(Number(form.edad) < 18){ setErrorEdad('Debes ser mayor de 18 años para registrarte'); return }
    if(!form.nombre || !form.email) return
    setUser({ ...form, fechaRegistro: new Date().toISOString(), aceptoTyc: FRASE_EXACTA })
  }

  const puedeRegistrar = form.nombre && form.email && Number(form.edad)>=18 && c1 && c2

  if(!user){
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-zinc-900 w-full max-w-md rounded-3xl p-6 border border-zinc-800">
          <h1 className="text-2xl font-black mb-1"><span className="text-[#00ff88]">FICHA</span> Registro</h1>
          <p className="text-xs text-zinc-400 mb-5">Crea tu cuenta para jugar. Solo +18, entretenimiento.</p>
          <input placeholder="Nombre completo" className="w-full bg-zinc-800 rounded-xl p-3 mb-3 text-sm" value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} />
          <input placeholder="Email" type="email" className="w-full bg-zinc-800 rounded-xl p-3 mb-3 text-sm" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <input placeholder="Edad" type="number" className="w-full bg-zinc-800 rounded-xl p-3 mb-2 text-sm" value={form.edad} onChange={e=>setForm({...form,edad:e.target.value})} />
          {errorEdad && <div className="text-red-400 text-xs mb-3">{errorEdad}</div>}
          
          <label className="flex gap-3 bg-zinc-800/50 p-3 rounded-xl mb-3 border border-zinc-700">
            <input type="checkbox" checked={c1} onChange={e=>setC1(e.target.checked)} className="mt-1" />
            <span className="text-[11px] leading-tight text-zinc-300">{FRASE_EXACTA}</span>
          </label>
          <label className="flex gap-3 bg-zinc-800/50 p-3 rounded-xl mb-5 border border-zinc-700">
            <input type="checkbox" checked={c2} onChange={e=>setC2(e.target.checked)} className="mt-1" />
            <span className="text-[11px] leading-tight text-zinc-300">Acepto Términos y Condiciones y Política de Privacidad. He leído que las fichas no tienen valor real.</span>
          </label>

          <button disabled={!puedeRegistrar} onClick={registrar} className={`w-full py-3 rounded-full font-black ${puedeRegistrar?'bg-[#00ff88] text-black':'bg-zinc-700 text-zinc-500'}`}>CREAR CUENTA</button>
          <div className="text-[9px] text-zinc-600 text-center mt-4 leading-tight">Al registrarte confirmas que eres mayor de 18 años, que entiendes que compras fichas virtuales sin valor real, no canjeables, sin reembolsos, solo entretenimiento. Juego responsable.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white max-w-md mx-auto">
      <header className="sticky top-0 z-20 bg-black/80 backdrop-blur p-4 flex justify-between items-center border-b border-zinc-800">
        <h1 className="font-black"><span className="text-[#00ff88]">FICHA</span> <span className="text-xs text-zinc-500">{user.nombre}</span></h1>
        <div className="flex gap-2"><div className="bg-zinc-900 px-3 py-1 rounded-full text-sm">🪙 {saldo}</div><button onClick={()=>setTab('tienda')} className="bg-[#00ff88] text-black px-3 py-1 rounded-full text-xs font-bold">TIENDA</button></div>
      </header>
      <nav className="flex gap-2 p-3">
        {['partidos','tienda','jugadas','perfil'].map(t=><button key={t} onClick={()=>setTab(t)} className={`flex-1 py-2 rounded-full text-xs font-bold capitalize ${tab===t?'bg-[#00ff88] text-black':'bg-zinc-900'}`}>{t}</button>)}
      </nav>

      {tab==='partidos' && (
        <div className="p-3 space-y-3 pb-24">
          {PARTIDOS.map(p=>(
            <div key={p.id} className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
              <div className="text-[10px] text-zinc-500 mb-2">{p.hora}</div>
              <div className="font-bold mb-3">{p.local} vs {p.visita}</div>
              <div className="grid grid-cols-3 gap-2">
                {[p.momios.local, p.momios.empate, p.momios.visita].map((m,i)=>(
                  <button key={i} onClick={()=>setSel({partido:`${p.local} vs ${p.visita}`, pick:['Local','Empate','Visita'][i], momio:m})} className="bg-zinc-800 py-2 rounded-xl text-xs border border-zinc-700">{['Local','Empate','Visita'][i]}<br/><b>{m}</b></button>
                ))}
              </div>
            </div>
          ))}
          {sel && <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 p-4 max-w-md mx-auto border-t border-zinc-800"><div className="text-xs mb-2">{sel.partido} - {sel.pick} @{sel.momio}</div><button onClick={()=>{ if(saldo>=monto){ setSaldo(s=>s-monto); setApuestas(a=>[...a,{...sel,monto,ganancia:Math.round(monto*sel.momio),estado:'pendiente',id:Date.now()}]); setSel(null)} }} className="w-full bg-[#00ff88] text-black py-2 rounded-full font-bold">Apostar {monto} fichas</button></div>}
        </div>
      )}

      {tab==='tienda' && (
        <div className="p-3 space-y-3">
          {PAQUETES.map((paq,i)=>(
            <div key={i} className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
              <div className="flex justify-between"><div><b>{paq.fichas} fichas</b>{paq.tag && <span className="ml-2 text-[10px] bg-[#00ff88] text-black px-2 rounded-full">{paq.tag}</span>}</div><div className="text-right"><div>${paq.precio} MXN</div><button onClick={()=>setShowPay(paq)} className="bg-[#00ff88] text-black px-3 py-1 rounded-full text-xs font-bold mt-1">Pagar MP</button></div></div>
            </div>
          ))}
        </div>
      )}

      {tab==='jugadas' && <div className="p-3"><button onClick={()=>setApuestas(ap=>ap.map(j=>{ if(j.estado!=='pendiente') return j; const gana=Math.random()>0.5; if(gana) setSaldo(s=>s+j.ganancia); return {...j,estado:gana?'ganada':'perdida'} }))} className="w-full bg-white text-black py-2 rounded-full font-bold mb-3">Simular Resultados</button>{apuestas.map(j=><div key={j.id} className="bg-zinc-900 p-3 rounded-xl mb-2 text-xs flex justify-between"><span>{j.partido} - {j.pick}</span><span className={j.estado==='ganada'?'text-green-400': j.estado==='perdida'?'text-red-400':'text-zinc-400'}>{j.estado}</span></div>)}</div>}

      {tab==='perfil' && (
        <div className="p-4 space-y-3">
          <div className="bg-zinc-900 rounded-2xl p-4"><div className="text-sm">{user.nombre}</div><div className="text-xs text-zinc-400">{user.email} - {user.edad} años</div><div className="text-[10px] text-zinc-500 mt-2">Registro: {new Date(user.fechaRegistro).toLocaleString()}</div></div>
          <div className="bg-zinc-900 rounded-2xl p-4 border border-[#00ff88]/30"><div className="text-xs font-bold text-[#00ff88] mb-2">T&C Aceptados al registro:</div><div className="text-[11px] text-zinc-300 leading-tight">"{FRASE_EXACTA}"</div></div>
          <button onClick={()=>setShowTyc(true)} className="w-full bg-zinc-800 py-3 rounded-full text-sm">Ver Términos y Condiciones Completos</button>
          <button onClick={()=>{ localStorage.removeItem('ficha_user'); setUser(null) }} className="w-full text-zinc-500 text-xs">Cerrar sesión / Borrar registro</button>
        </div>
      )}

      {showPay && (
        <div className="fixed inset-0 bg-black/80 z-30 flex items-end"><div className="bg-zinc-900 w-full max-w-md mx-auto rounded-t-2xl p-5">
          <h3 className="font-bold mb-2">Confirmar compra - {showPay.fichas} fichas</h3>
          <div className="bg-zinc-800 p-3 rounded-xl text-[11px] mb-3">{FRASE_EXACTA}</div>
          <button onClick={()=>{ setSaldo(s=>s+showPay.fichas); setShowPay(null); alert('Pago simulado OK - fichas abonadas') }} className="w-full bg-[#00ff88] text-black py-3 rounded-full font-black">CONFIRMO Y PAGO ${showPay.precio}</button>
          <button onClick={()=>setShowPay(null)} className="w-full mt-2 text-zinc-500 text-sm">Cancelar</button>
        </div></div>
      )}

      {showTyc && (
        <div className="fixed inset-0 bg-black/90 z-40 overflow-auto p-4"><div className="bg-zinc-900 max-w-md mx-auto rounded-2xl p-6">
          <h2 className="font-black text-lg mb-3">Términos y Condiciones FICHA</h2>
          <div className="text-[11px] text-zinc-300 space-y-3 leading-relaxed max-h-[70vh] overflow-auto">
            <p><b>1. Naturaleza del servicio:</b> FICHA es un juego social de entretenimiento. No ofrece apuestas con dinero real.</p>
            <p><b>2. Fichas virtuales:</b> {FRASE_EXACTA}</p>
            <p><b>3. Compras:</b> Todas las compras de fichas virtuales son finales, sin reembolsos. No son transferibles ni canjeables por dinero real, bienes o servicios fuera de la app. Las fichas no tienen valor monetario.</p>
            <p><b>4. Edad:</b> Solo mayores de 18 años. Verificación al registro.</p>
            <p><b>5. Juego responsable:</b> Este juego es solo entretenimiento. Si sientes que pierdes control, suspende el uso. No garantiza ganancias.</p>
            <p><b>6. Aceptación:</b> Al registrarte y al pagar, el usuario acepta expresamente: "{FRASE_EXACTA}"</p>
            <p><b>7. Legislación:</b> Servicio conforme a leyes mexicanas. No constituye juego de azar con apuestas de dinero real según Ley Federal de Juegos y Sorteos.</p>
          </div>
          <button onClick={()=>setShowTyc(false)} className="w-full mt-5 bg-white text-black py-3 rounded-full font-bold">Cerrar</button>
        </div></div>
      )}
    </div>
  )
}
