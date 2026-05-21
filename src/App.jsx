import { useState } from "react";

// ─── THEMES ───────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    name:"Dark", icon:"🌙",
    bg:"#08090d", surface:"#0f1117", surface2:"#161b27", border:"#1e2533", border2:"#1a2030",
    text:"#f1f5f9", textSub:"#94a3b8", textMuted:"#64748b",
    accent:"#22d3ee", accentB:"#3b82f6", accentGrad:"linear-gradient(135deg,#22d3ee,#3b82f6)",
    headerBg:"#08090dee", gridColor:"rgba(34,211,238,.04)",
    inputBg:"#161b27", shadow:"0 8px 40px rgba(0,0,0,.6)",
    tagBg:(c)=>`${c}18`, sentBg:"#22d3ee18", sentText:"#22d3ee",
    btnSecBg:"transparent", btnSecBorder:"#1e2533", btnSecText:"#94a3b8",
    statBorder:(c)=>`${c}22`,
  },
  white: {
    name:"Light", icon:"☀️",
    bg:"#f8fafc", surface:"#ffffff", surface2:"#f1f5f9", border:"#e2e8f0", border2:"#e8edf5",
    text:"#0f172a", textSub:"#475569", textMuted:"#94a3b8",
    accent:"#0ea5e9", accentB:"#6366f1", accentGrad:"linear-gradient(135deg,#0ea5e9,#6366f1)",
    headerBg:"#ffffffee", gridColor:"rgba(14,165,233,.05)",
    inputBg:"#f8fafc", shadow:"0 8px 40px rgba(0,0,0,.12)",
    tagBg:(c)=>`${c}18`, sentBg:"#0ea5e918", sentText:"#0ea5e9",
    btnSecBg:"#f1f5f9", btnSecBorder:"#e2e8f0", btnSecText:"#475569",
    statBorder:(c)=>`${c}33`,
  },
  corporate: {
    name:"Corporate", icon:"🏢",
    bg:"#0a1628", surface:"#0d1f3c", surface2:"#112348", border:"#1e3a5f", border2:"#162f50",
    text:"#e8f4fd", textSub:"#7fb3d3", textMuted:"#4a7a9b",
    accent:"#1e90ff", accentB:"#00c6ff", accentGrad:"linear-gradient(135deg,#1e90ff,#00c6ff)",
    headerBg:"#0a1628ee", gridColor:"rgba(30,144,255,.05)",
    inputBg:"#112348", shadow:"0 8px 40px rgba(0,0,0,.6)",
    tagBg:(c)=>`${c}22`, sentBg:"#1e90ff22", sentText:"#1e90ff",
    btnSecBg:"transparent", btnSecBorder:"#1e3a5f", btnSecText:"#7fb3d3",
    statBorder:(c)=>`${c}30`,
  },
};

const TABS = ["Dashboard","Tenants","Notifications","Settings"];

const NOTIF_TEMPLATES = {
  welcome:    {label:"Welcome / Move-in",    color:"#22d3ee", icon:"🏠"},
  reminder21: {label:"Rent Due (3 weeks)",   color:"#a78bfa", icon:"📅"},
  reminder7:  {label:"Rent Due (1 week)",    color:"#f59e0b", icon:"📆"},
  dueToday:   {label:"Rent Due Today",       color:"#f97316", icon:"🔔"},
  overdue:    {label:"Payment Overdue",      color:"#ef4444", icon:"⚠️"},
  confirmed:  {label:"Payment Confirmed",    color:"#10b981", icon:"✅"},
};

const STATUS_META = {
  current:    {label:"Paid",        dot:"#22c55e", darkBg:"#052e16", darkTxt:"#4ade80", lightBg:"#f0fdf4", lightTxt:"#166534", corpBg:"#0a2540", corpTxt:"#4ade80"},
  reminder21: {label:"Due in 3wks", dot:"#8b5cf6", darkBg:"#1e1b4b", darkTxt:"#a78bfa", lightBg:"#f5f3ff", lightTxt:"#5b21b6", corpBg:"#1a1040", corpTxt:"#a78bfa"},
  due7days:   {label:"Due in 1wk",  dot:"#f97316", darkBg:"#431407", darkTxt:"#fb923c", lightBg:"#fff7ed", lightTxt:"#9a3412", corpBg:"#2a1a05", corpTxt:"#fb923c"},
  dueToday:   {label:"Due Today",   dot:"#d946ef", darkBg:"#3b0764", darkTxt:"#e879f9", lightBg:"#fdf4ff", lightTxt:"#86198f", corpBg:"#250540", corpTxt:"#e879f9"},
  overdue:    {label:"Overdue",     dot:"#ef4444", darkBg:"#450a0a", darkTxt:"#f87171", lightBg:"#fef2f2", lightTxt:"#991b1b", corpBg:"#2a0808", corpTxt:"#f87171"},
  new:        {label:"New Tenant",  dot:"#3b82f6", darkBg:"#0c1a3a", darkTxt:"#60a5fa", lightBg:"#eff6ff", lightTxt:"#1d4ed8", corpBg:"#0a1628", corpTxt:"#60a5fa"},
};

const chIcon = {email:"✉️", sms:"💬", whatsapp:"📱"};

const DEMO_TENANTS = [
  {id:1, idNo:"T-00124", name:"Maria Gonzalez",  dob:"1990-03-12", unit:"Apt 3B",  email:"maria@email.com", phone:"+1 555-0101", rentAmount:1850, rentDue:1,  status:"current",  lastPaid:"May 1",  moveIn:"2024-01-15", overdueDays:0,
   payments:[
     {pid:1, date:"2025-05-01", amount:1850, months:"May 2025",    note:"On time"},
     {pid:2, date:"2025-04-01", amount:1850, months:"Apr 2025",    note:"On time"},
     {pid:3, date:"2025-03-01", amount:3700, months:"Mar–Apr 2025",note:"2 months"},
   ]},
  {id:2, idNo:"T-00215", name:"James Okafor",    dob:"1985-07-28", unit:"Apt 7A",  email:"james@email.com", phone:"+1 555-0182", rentAmount:2100, rentDue:5,  status:"due7days", lastPaid:"Apr 5",  moveIn:"2023-09-03", overdueDays:0,
   payments:[
     {pid:1, date:"2025-04-05", amount:2100, months:"Apr 2025", note:""},
     {pid:2, date:"2025-03-05", amount:2100, months:"Mar 2025", note:""},
   ]},
  {id:3, idNo:"T-00308", name:"Priya Sharma",    dob:"1992-11-04", unit:"Suite 1", email:"priya@email.com", phone:"+1 555-0234", rentAmount:3200, rentDue:15, status:"overdue",  lastPaid:"Apr 2",  moveIn:"2022-03-01", overdueDays:5,
   payments:[
     {pid:1, date:"2025-04-02", amount:3200, months:"Apr 2025", note:"Late"},
   ]},
  {id:4, idNo:"T-00401", name:"Luca Bianchi",    dob:"1998-02-19", unit:"Apt 2C",  email:"luca@email.com",  phone:"+1 555-0399", rentAmount:1600, rentDue:20, status:"new",      lastPaid:"—",      moveIn:"2025-05-18", overdueDays:0,
   payments:[]},
  {id:5, idNo:"T-00512", name:"Aisha Ndiaye",    dob:"1995-09-30", unit:"Apt 5F",  email:"aisha@email.com", phone:"+1 555-0455", rentAmount:1950, rentDue:10, status:"reminder21",lastPaid:"Apr 10", moveIn:"2023-11-05", overdueDays:0,
   payments:[
     {pid:1, date:"2025-04-10", amount:1950, months:"Apr 2025", note:""},
     {pid:2, date:"2025-03-10", amount:1950, months:"Mar 2025", note:""},
   ]},
];

const DEMO_LOG = [
  {id:1,tenant:"Luca Bianchi",   type:"welcome",    channel:["email","whatsapp"],      time:"Today, 9:02 AM",  status:"sent"},
  {id:2,tenant:"James Okafor",   type:"reminder7",  channel:["email","sms"],            time:"Today, 8:30 AM",  status:"sent"},
  {id:3,tenant:"Priya Sharma",   type:"overdue",    channel:["email","sms","whatsapp"], time:"Today, 8:30 AM",  status:"sent"},
  {id:4,tenant:"Aisha Ndiaye",   type:"reminder21", channel:["email"],                  time:"Today, 8:30 AM",  status:"sent"},
  {id:5,tenant:"Maria Gonzalez", type:"confirmed",  channel:["email"],                  time:"May 1, 10:15 AM", status:"sent"},
];

function getStatusStyle(status, themeName) {
  const m = STATUS_META[status] || STATUS_META.current;
  if (themeName==="white")     return {bg:m.lightBg, text:m.lightTxt, dot:m.dot};
  if (themeName==="corporate") return {bg:m.corpBg,  text:m.corpTxt,  dot:m.dot};
  return {bg:m.darkBg, text:m.darkTxt, dot:m.dot};
}

// ─── TENANT PROFILE PANEL ─────────────────────────────────────────────────────
function TenantPanel({tenant, onClose, onSave, themeName}) {
  const T = THEMES[themeName];
  const [editing, setEditing] = useState(false);
  const [info, setInfo] = useState({...tenant});
  const [payments, setPayments] = useState(tenant.payments.map(p=>({...p})));
  const [editingPid, setEditingPid] = useState(null);
  const [newRow, setNewRow] = useState({date:"", amount:"", months:"", note:""});
  const [showNewRow, setShowNewRow] = useState(false);

  const ss = getStatusStyle(tenant.status, themeName);

  const card = {background:T.surface2, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px 18px", marginBottom:12};
  const inputStyle = {background:T.inputBg, border:`1px solid ${T.border}`, borderRadius:7, padding:"7px 10px", color:T.text, fontSize:13, outline:"none", width:"100%", boxSizing:"border-box"};
  const label = {fontSize:10, color:T.textMuted, fontWeight:700, letterSpacing:"0.08em", marginBottom:4, display:"block"};

  function saveInfo() {
    onSave({...info, payments});
    setEditing(false);
  }

  function savePayment(pid) {
    setPayments(prev=>prev.map(p=>p.pid===pid ? {...p} : p));
    setEditingPid(null);
  }

  function updatePayment(pid, field, val) {
    setPayments(prev=>prev.map(p=>p.pid===pid ? {...p,[field]:val} : p));
  }

  function deletePayment(pid) {
    setPayments(prev=>prev.filter(p=>p.pid!==pid));
  }

  function addPayment() {
    if (!newRow.date || !newRow.amount) return;
    const p = {...newRow, pid:Date.now(), amount:Number(newRow.amount)};
    setPayments(prev=>[p,...prev]);
    setNewRow({date:"", amount:"", months:"", note:""});
    setShowNewRow(false);
  }

  const totalPaid = payments.reduce((s,p)=>s+Number(p.amount),0);

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{position:"fixed",inset:0,background:"#00000066",zIndex:100,backdropFilter:"blur(3px)"}}/>

      {/* Panel */}
      <div style={{
        position:"fixed",top:0,right:0,height:"100vh",width:520,zIndex:101,
        background:T.surface,borderLeft:`1px solid ${T.border}`,
        boxShadow:T.shadow,display:"flex",flexDirection:"column",
        animation:"slideIn .25s cubic-bezier(.4,0,.2,1)"
      }}>
        {/* Panel header */}
        <div style={{padding:"20px 24px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:14,flexShrink:0}}>
          <div style={{width:48,height:48,borderRadius:14,background:`${ss.dot}22`,border:`2px solid ${ss.dot}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:900,color:ss.dot,flexShrink:0}}>
            {info.name[0]}
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:800,fontSize:17,color:T.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{info.name}</div>
            <div style={{fontSize:12,color:T.textMuted}}>{info.unit} · {info.idNo}</div>
          </div>
          <span style={{background:ss.bg,color:ss.text,padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:ss.dot,display:"inline-block"}}/>
            {STATUS_META[tenant.status]?.label}
          </span>
          <button onClick={onClose} style={{background:"transparent",border:"none",color:T.textMuted,fontSize:20,cursor:"pointer",padding:"4px 8px",lineHeight:1}}>✕</button>
        </div>

        {/* Scrollable body */}
        <div style={{flex:1,overflowY:"auto",padding:"20px 24px"}}>

          {/* Action bar */}
          <div style={{display:"flex",gap:8,marginBottom:20}}>
            {editing ? (
              <>
                <button onClick={saveInfo} style={{padding:"8px 18px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,background:T.accentGrad,color:themeName==="white"?"#fff":"#08090d"}}>Save Changes</button>
                <button onClick={()=>{setInfo({...tenant});setEditing(false);}} style={{padding:"8px 14px",borderRadius:8,border:`1px solid ${T.btnSecBorder}`,background:T.btnSecBg,color:T.btnSecText,cursor:"pointer",fontSize:12}}>Cancel</button>
              </>
            ) : (
              <button onClick={()=>setEditing(true)} style={{padding:"8px 18px",borderRadius:8,border:`1px solid ${T.border}`,background:T.surface2,color:T.textSub,cursor:"pointer",fontWeight:600,fontSize:12}}>✏️ Edit Profile</button>
            )}
          </div>

          {/* Profile fields */}
          <div style={card}>
            <div style={{fontWeight:700,fontSize:13,color:T.accent,marginBottom:14}}>👤 Personal Information</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[
                ["Full Name","name","text"],
                ["ID Number","idNo","text"],
                ["Date of Birth","dob","date"],
                ["Phone Number","phone","tel"],
                ["Email Address","email","email"],
                ["Unit / Property","unit","text"],
              ].map(([lbl,key,type])=>(
                <div key={key}>
                  <span style={label}>{lbl.toUpperCase()}</span>
                  {editing
                    ? <input type={type} value={info[key]||""} onChange={e=>setInfo(p=>({...p,[key]:e.target.value}))} style={inputStyle}/>
                    : <div style={{fontSize:13,color:T.text,fontWeight:600,padding:"7px 0"}}>{info[key]||"—"}</div>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Rent info */}
          <div style={card}>
            <div style={{fontWeight:700,fontSize:13,color:T.accent,marginBottom:14}}>🏠 Tenancy Details</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[
                ["Monthly Rent ($)","rentAmount","number"],
                ["Rent Due Day","rentDue","number"],
                ["Move-in Date","moveIn","date"],
              ].map(([lbl,key,type])=>(
                <div key={key}>
                  <span style={label}>{lbl.toUpperCase()}</span>
                  {editing
                    ? <input type={type} value={info[key]||""} onChange={e=>setInfo(p=>({...p,[key]:e.target.value}))} style={inputStyle}/>
                    : <div style={{fontSize:13,color:T.text,fontWeight:600,padding:"7px 0"}}>{key==="rentAmount"?`$${Number(info[key]).toLocaleString()}`:info[key]||"—"}</div>
                  }
                </div>
              ))}
              <div>
                <span style={label}>TOTAL PAID (ALL TIME)</span>
                <div style={{fontSize:16,fontWeight:800,color:"#10b981",padding:"7px 0"}}>${totalPaid.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Payment sheet */}
          <div style={{...card,padding:0,overflow:"hidden"}}>
            <div style={{padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${T.border}`}}>
              <div style={{fontWeight:700,fontSize:13,color:T.accent}}>💳 Payment History</div>
              <button onClick={()=>setShowNewRow(true)} style={{padding:"5px 14px",borderRadius:7,border:"none",cursor:"pointer",fontWeight:700,fontSize:11,background:T.accentGrad,color:themeName==="white"?"#fff":"#08090d"}}>+ Add Payment</button>
            </div>

            {/* New row form */}
            {showNewRow && (
              <div style={{padding:"12px 16px",background:T.tagBg(T.accent),borderBottom:`1px solid ${T.border}`}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr auto",gap:8,alignItems:"end"}}>
                  {[["Date","date","date"],["Amount ($)","amount","number"],["Months Covered","months","text"],["Note/Reference","note","text"]].map(([lbl,key,type])=>(
                    <div key={key}>
                      <span style={{...label,fontSize:9}}>{lbl.toUpperCase()}</span>
                      <input type={type} value={newRow[key]} onChange={e=>setNewRow(p=>({...p,[key]:e.target.value}))} style={{...inputStyle,fontSize:12}}/>
                    </div>
                  ))}
                  <div style={{display:"flex",gap:4,paddingBottom:1}}>
                    <button onClick={addPayment} style={{padding:"7px 10px",borderRadius:7,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,background:"#10b981",color:"#fff"}}>✓</button>
                    <button onClick={()=>setShowNewRow(false)} style={{padding:"7px 8px",borderRadius:7,border:`1px solid ${T.border}`,background:"transparent",color:T.textMuted,cursor:"pointer",fontSize:12}}>✕</button>
                  </div>
                </div>
              </div>
            )}

            {payments.length===0 && !showNewRow && (
              <div style={{padding:"28px",textAlign:"center",color:T.textMuted,fontSize:13}}>No payments recorded yet.</div>
            )}

            {payments.map((p,i)=>(
              <div key={p.pid} style={{padding:"10px 16px",borderBottom:i<payments.length-1?`1px solid ${T.border2}`:"none",background:i%2===0?"transparent":T.surface2}}>
                {editingPid===p.pid ? (
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr auto",gap:8,alignItems:"end"}}>
                    {[["Date","date","date"],["Amount","amount","number"],["Months","months","text"],["Note","note","text"]].map(([lbl,key,type])=>(
                      <div key={key}>
                        <span style={{...label,fontSize:9}}>{lbl.toUpperCase()}</span>
                        <input type={type} value={p[key]} onChange={e=>updatePayment(p.pid,key,e.target.value)} style={{...inputStyle,fontSize:12}}/>
                      </div>
                    ))}
                    <div style={{display:"flex",gap:4,paddingBottom:1}}>
                      <button onClick={()=>savePayment(p.pid)} style={{padding:"7px 10px",borderRadius:7,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,background:"#10b981",color:"#fff"}}>✓</button>
                      <button onClick={()=>setEditingPid(null)} style={{padding:"7px 8px",borderRadius:7,border:`1px solid ${T.border}`,background:"transparent",color:T.textMuted,cursor:"pointer",fontSize:12}}>✕</button>
                    </div>
                  </div>
                ) : (
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:34,height:34,borderRadius:8,background:"#10b98118",border:"1px solid #10b98133",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>💳</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                        <span style={{fontSize:13,fontWeight:700,color:T.text}}>${Number(p.amount).toLocaleString()}</span>
                        <span style={{fontSize:12,color:T.textMuted}}>{p.date}</span>
                        <span style={{fontSize:12,color:T.accent,fontWeight:600}}>{p.months}</span>
                      </div>
                      {p.note && <div style={{fontSize:11,color:T.textMuted,marginTop:2}}>{p.note}</div>}
                    </div>
                    <div style={{display:"flex",gap:6,flexShrink:0}}>
                      <button onClick={()=>setEditingPid(p.pid)} style={{padding:"5px 10px",borderRadius:6,border:`1px solid ${T.border}`,background:"transparent",color:T.textMuted,cursor:"pointer",fontSize:11}}>Edit</button>
                      <button onClick={()=>deletePayment(p.pid)} style={{padding:"5px 8px",borderRadius:6,border:"1px solid #ef444433",background:"#ef444410",color:"#ef4444",cursor:"pointer",fontSize:11}}>✕</button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {payments.length>0 && (
              <div style={{padding:"12px 16px",borderTop:`1px solid ${T.border}`,display:"flex",justifyContent:"flex-end",gap:8,alignItems:"center"}}>
                <span style={{fontSize:12,color:T.textMuted}}>Total recorded:</span>
                <span style={{fontSize:15,fontWeight:800,color:"#10b981"}}>${totalPaid.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function RentalNotifier() {
  const [themeName, setThemeName] = useState("dark");
  const T = THEMES[themeName];

  const [tab, setTab] = useState("Dashboard");
  const [tenants, setTenants] = useState(DEMO_TENANTS);
  const [log, setLog] = useState(DEMO_LOG);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showAddTenant, setShowAddTenant] = useState(false);
  const [showSendModal, setShowSendModal] = useState(null);
  const [sendType, setSendType] = useState("welcome");
  const [sendChannels, setSendChannels] = useState({email:true,sms:true,whatsapp:false});
  const [settings, setSettings] = useState({
    sendgridKey:"",twilioSid:"",twilioToken:"",twilioFrom:"",whatsappFrom:"",fromEmail:"",
    reminder21:true,reminder7:true,dueToday:true,overdueMax:14,
    overdueChannels:{email:true,sms:true,whatsapp:true},
  });
  const [newTenant, setNewTenant] = useState({name:"",idNo:"",dob:"",unit:"",email:"",phone:"",rentAmount:"",rentDue:"1",moveIn:""});
  const [toast, setToast] = useState(null);
  const [sending, setSending] = useState(false);

  function showToast(msg, color) {
    setToast({msg, color:color||T.accent});
    setTimeout(()=>setToast(null), 3200);
  }

  function addTenant() {
    if (!newTenant.name||!newTenant.unit||!newTenant.email) return;
    const t = {...newTenant, id:Date.now(), status:"new", lastPaid:"—", rentAmount:Number(newTenant.rentAmount), overdueDays:0, payments:[]};
    setTenants(prev=>[t,...prev]);
    setLog(prev=>[{id:Date.now()+1,tenant:t.name,type:"welcome",channel:Object.keys(sendChannels).filter(c=>sendChannels[c]),time:"Just now",status:"sent"},...prev]);
    setNewTenant({name:"",idNo:"",dob:"",unit:"",email:"",phone:"",rentAmount:"",rentDue:"1",moveIn:""});
    setShowAddTenant(false);
    showToast(`🏠 Welcome message sent to ${t.name}!`);
  }

  function markPaid(id, e) {
    e && e.stopPropagation();
    const t = tenants.find(x=>x.id===id);
    setTenants(prev=>prev.map(x=>x.id===id?{...x,status:"current",lastPaid:"Today",overdueDays:0}:x));
    setLog(prev=>[{id:Date.now(),tenant:t.name,type:"confirmed",channel:["email"],time:"Just now",status:"sent"},...prev]);
    showToast(`✅ Payment confirmed & sent to ${t.name}!`,"#10b981");
  }

  function sendManual() {
    const t = tenants.find(x=>x.id===showSendModal);
    if (!t) return;
    setSending(true);
    setTimeout(()=>{
      const ch = Object.keys(sendChannels).filter(c=>sendChannels[c]);
      setLog(prev=>[{id:Date.now(),tenant:t.name,type:sendType,channel:ch,time:"Just now",status:"sent"},...prev]);
      setSending(false); setShowSendModal(null);
      showToast(`📨 Sent to ${t.name} via ${ch.join(", ")}!`, NOTIF_TEMPLATES[sendType].color);
    }, 1200);
  }

  function saveTenantProfile(updated) {
    setTenants(prev=>prev.map(t=>t.id===updated.id?updated:t));
    if (selectedTenant?.id===updated.id) setSelectedTenant(updated);
    showToast("✅ Tenant profile saved!","#10b981");
  }

  const stats = {
    total:tenants.length,
    paid:tenants.filter(t=>t.status==="current").length,
    overdue:tenants.filter(t=>t.status==="overdue").length,
    dueSoon:tenants.filter(t=>["due7days","dueToday","reminder21"].includes(t.status)).length,
  };

  // Shared styles
  const card = {background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, padding:"20px 22px"};
  const inputStyle = {width:"100%",background:T.inputBg,border:`1px solid ${T.border}`,borderRadius:8,padding:"9px 12px",color:T.text,fontSize:13,outline:"none",boxSizing:"border-box"};
  const btnPrimary = {padding:"9px 20px",borderRadius:9,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,background:T.accentGrad,color:themeName==="white"?"#fff":"#08090d"};
  const btnSec = {padding:"9px 20px",borderRadius:9,border:`1px solid ${T.btnSecBorder}`,background:T.btnSecBg,color:T.btnSecText,cursor:"pointer",fontSize:13,fontWeight:600};
  const lbl = {fontSize:10,color:T.textMuted,marginBottom:5,fontWeight:700,letterSpacing:"0.08em",display:"block"};

  return (
    <div style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"'Sora','DM Sans','Segoe UI',sans-serif",position:"relative"}}>


      {toast && (
        <div style={{position:"fixed",top:24,right:24,zIndex:999,background:T.surface,border:`1px solid ${toast.color}`,borderRadius:12,padding:"14px 22px",fontSize:14,fontWeight:600,color:toast.color,boxShadow:`0 0 32px ${toast.color}44`,animation:"fadeIn .3s ease"}}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header style={{borderBottom:`1px solid ${T.border}`,padding:"16px 32px",display:"flex",alignItems:"center",gap:16,position:"sticky",top:0,background:T.headerBg,backdropFilter:"blur(12px)",zIndex:50}}>
        <div style={{width:36,height:36,borderRadius:10,background:T.accentGrad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🏢</div>
        <div>
          <div style={{fontWeight:800,fontSize:18,letterSpacing:"-0.5px",color:T.text}}>RentPulse</div>
          <div style={{fontSize:10,color:T.textMuted,letterSpacing:"0.08em"}}>TENANT NOTIFICATION SYSTEM</div>
        </div>
        <nav style={{marginLeft:32,display:"flex",gap:2}}>
          {TABS.map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"7px 16px",borderRadius:8,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,transition:"all .2s",background:tab===t?T.tagBg(T.accent):"transparent",color:tab===t?T.accent:T.textMuted,borderBottom:tab===t?`2px solid ${T.accent}`:"2px solid transparent"}}>{t}</button>
          ))}
        </nav>
        <div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
          <div style={{display:"flex",gap:4,background:T.surface2,borderRadius:10,padding:4,border:`1px solid ${T.border}`}}>
            {Object.entries(THEMES).map(([key,th])=>(
              <button key={key} onClick={()=>setThemeName(key)} title={th.name} style={{width:32,height:28,borderRadius:7,border:"none",cursor:"pointer",fontSize:14,transition:"all .2s",background:themeName===key?T.accentGrad:"transparent",opacity:themeName===key?1:0.5}}>{th.icon}</button>
            ))}
          </div>
          <button onClick={()=>{setTab("Tenants");setShowAddTenant(true);}} style={btnPrimary}>+ Add Tenant</button>
        </div>
      </header>

      <main style={{padding:"32px",maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>

        {/* ── DASHBOARD ── */}
        {tab==="Dashboard" && (
          <div>
            <h2 style={{fontSize:26,fontWeight:800,marginBottom:4,color:T.text}}>Overview</h2>
            <p style={{color:T.textMuted,marginBottom:28,fontSize:14}}>Automatic reminders fire at 21 days, 7 days, due date, then every 24hrs if overdue.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:32}}>
              {[{label:"Total Tenants",value:stats.total,icon:"👥",color:T.accent},{label:"Paid",value:stats.paid,icon:"✅",color:"#10b981"},{label:"Due Soon",value:stats.dueSoon,icon:"⏰",color:"#f97316"},{label:"Overdue",value:stats.overdue,icon:"⚠️",color:"#ef4444"}].map(s=>(
                <div key={s.label} style={{...card,border:`1px solid ${T.statBorder(s.color)}`,position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:-8,right:-8,fontSize:44,opacity:.07}}>{s.icon}</div>
                  <div style={{fontSize:10,color:T.textMuted,fontWeight:700,letterSpacing:"0.1em",marginBottom:8}}>{s.label.toUpperCase()}</div>
                  <div style={{fontSize:40,fontWeight:900,color:s.color,lineHeight:1}}>{s.value}</div>
                </div>
              ))}
            </div>
            <div style={{...card,marginBottom:24}}>
              <div style={{fontWeight:700,fontSize:15,marginBottom:18,color:T.text}}>📬 Automatic Notification Schedule</div>
              <div style={{display:"flex",gap:0,position:"relative"}}>
                <div style={{position:"absolute",top:20,left:20,right:20,height:2,background:`linear-gradient(90deg,${T.accent},#ef4444)`,opacity:.3,borderRadius:2}}/>
                {[{day:"Move-in",icon:"🏠",label:"Welcome",color:"#22d3ee"},{day:"Day -21",icon:"📅",label:"3-week reminder",color:"#a78bfa"},{day:"Day -7",icon:"📆",label:"1-week reminder",color:"#f59e0b"},{day:"Due Date",icon:"🔔",label:"Due today",color:"#f97316"},{day:"+24h",icon:"⚠️",label:"Overdue daily",color:"#ef4444"}].map((s,i)=>(
                  <div key={i} style={{flex:1,textAlign:"center",paddingTop:8}}>
                    <div style={{width:40,height:40,borderRadius:"50%",background:T.tagBg(s.color),border:`2px solid ${s.color}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,margin:"0 auto 8px",position:"relative",zIndex:1}}>{s.icon}</div>
                    <div style={{fontSize:11,fontWeight:700,color:s.color}}>{s.day}</div>
                    <div style={{fontSize:10,color:T.textMuted,marginTop:2}}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={card}>
              <div style={{fontWeight:700,fontSize:15,marginBottom:18,color:T.text}}>Recent Notifications</div>
              {log.slice(0,5).map(l=>{
                const tmpl = NOTIF_TEMPLATES[l.type];
                return (
                  <div key={l.id} style={{display:"flex",alignItems:"center",gap:16,padding:"12px 0",borderBottom:`1px solid ${T.border2}`}}>
                    <div style={{width:36,height:36,borderRadius:9,background:T.tagBg(tmpl.color),display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,border:`1px solid ${tmpl.color}33`,flexShrink:0}}>{tmpl.icon}</div>
                    <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:T.text}}>{l.tenant}</div><div style={{fontSize:12,color:T.textMuted}}>{tmpl.label}</div></div>
                    <div style={{display:"flex",gap:5}}>{l.channel.map(c=><span key={c} style={{fontSize:13}}>{chIcon[c]}</span>)}</div>
                    <div style={{fontSize:12,color:T.textMuted,minWidth:130,textAlign:"right"}}>{l.time}</div>
                    <span style={{fontSize:11,fontWeight:700,color:T.sentText,background:T.sentBg,padding:"3px 10px",borderRadius:20}}>SENT</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TENANTS ── */}
        {tab==="Tenants" && (
          <div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
              <div>
                <h2 style={{fontSize:26,fontWeight:800,marginBottom:4,color:T.text}}>Tenants</h2>
                <p style={{color:T.textMuted,fontSize:14}}>Click any tenant to view their full profile and payment history.</p>
              </div>
              <button onClick={()=>setShowAddTenant(true)} style={btnPrimary}>+ Add Tenant</button>
            </div>

            {showAddTenant && (
              <div style={{...card,border:`1px solid ${T.accent}44`,marginBottom:24}}>
                <div style={{fontWeight:700,fontSize:15,marginBottom:18,color:T.accent}}>🏠 New Tenant — Welcome message sent automatically</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
                  {[["Full Name","name","text"],["ID Number","idNo","text"],["Date of Birth","dob","date"],["Unit / Property","unit","text"],["Email","email","email"],["Phone","phone","tel"],["Monthly Rent ($)","rentAmount","number"],["Rent Due Day (1-28)","rentDue","number"],["Move-in Date","moveIn","date"]].map(([l,key,type])=>(
                    <div key={key}><span style={lbl}>{l.toUpperCase()}</span><input type={type} value={newTenant[key]} onChange={e=>setNewTenant(p=>({...p,[key]:e.target.value}))} style={inputStyle}/></div>
                  ))}
                </div>
                <div style={{display:"flex",gap:10,marginTop:18}}>
                  <button onClick={addTenant} style={btnPrimary}>Add & Send Welcome</button>
                  <button onClick={()=>setShowAddTenant(false)} style={btnSec}>Cancel</button>
                </div>
              </div>
            )}

            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {tenants.map(t=>{
                const ss = getStatusStyle(t.status, themeName);
                return (
                  <div key={t.id} onClick={()=>setSelectedTenant(t)} style={{...card,display:"flex",alignItems:"center",gap:18,cursor:"pointer",transition:"border-color .15s, transform .15s",":hover":{borderColor:T.accent}}}>
                    <div style={{width:44,height:44,borderRadius:12,background:`${ss.dot}22`,border:`1px solid ${ss.dot}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:900,color:ss.dot,flexShrink:0}}>{t.name[0]}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:700,fontSize:15,color:T.text}}>{t.name} <span style={{fontSize:11,color:T.textMuted,fontWeight:400}}>· {t.unit} · {t.idNo}</span></div>
                      <div style={{fontSize:12,color:T.textMuted,marginTop:2}}>{t.email} · {t.phone} · <b style={{color:T.textSub}}>Rent ${t.rentAmount?.toLocaleString()}</b> · Due day <b style={{color:T.textSub}}>{t.rentDue}</b> · Last paid: <b style={{color:T.textSub}}>{t.lastPaid}</b></div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
                      <span style={{background:ss.bg,color:ss.text,padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",gap:5}}>
                        <span style={{width:6,height:6,borderRadius:"50%",background:ss.dot,display:"inline-block"}}/>{STATUS_META[t.status]?.label}
                      </span>
                      {["overdue","dueToday","due7days"].includes(t.status) && (
                        <button onClick={(e)=>markPaid(t.id,e)} style={{padding:"6px 14px",borderRadius:8,border:"1px solid #10b98133",background:"#10b98115",color:"#10b981",cursor:"pointer",fontWeight:700,fontSize:12}}>Mark Paid ✓</button>
                      )}
                      <button onClick={e=>{e.stopPropagation();setShowSendModal(t.id);}} style={{...btnSec,padding:"6px 14px",fontSize:12}}>Send 📨</button>
                      <div style={{color:T.textMuted,fontSize:16}}>›</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── NOTIFICATIONS ── */}
        {tab==="Notifications" && (
          <div>
            <h2 style={{fontSize:26,fontWeight:800,marginBottom:6,color:T.text}}>Notification Log</h2>
            <p style={{color:T.textMuted,marginBottom:24,fontSize:14}}>Every message sent to every tenant.</p>
            <div style={{...card,padding:0,overflow:"hidden"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{borderBottom:`1px solid ${T.border}`}}>{["Tenant","Type","Channels","Time","Status"].map(h=><th key={h} style={{padding:"14px 18px",textAlign:"left",fontSize:10,color:T.textMuted,fontWeight:700,letterSpacing:"0.1em"}}>{h.toUpperCase()}</th>)}</tr></thead>
                <tbody>{log.map((l,i)=>{
                  const tmpl = NOTIF_TEMPLATES[l.type];
                  return (
                    <tr key={l.id} style={{borderBottom:`1px solid ${T.border2}`}}>
                      <td style={{padding:"13px 18px",fontSize:13,fontWeight:600,color:T.text}}>{l.tenant}</td>
                      <td style={{padding:"13px 18px"}}><span style={{background:T.tagBg(tmpl.color),color:tmpl.color,padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>{tmpl.icon} {tmpl.label}</span></td>
                      <td style={{padding:"13px 18px"}}><div style={{display:"flex",gap:5}}>{l.channel.map(c=><span key={c} title={c} style={{fontSize:14}}>{chIcon[c]}</span>)}</div></td>
                      <td style={{padding:"13px 18px",fontSize:12,color:T.textMuted,whiteSpace:"nowrap"}}>{l.time}</td>
                      <td style={{padding:"13px 18px"}}><span style={{background:T.sentBg,color:T.sentText,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>SENT</span></td>
                    </tr>
                  );
                })}</tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {tab==="Settings" && (
          <div>
            <h2 style={{fontSize:26,fontWeight:800,marginBottom:6,color:T.text}}>Settings & Integrations</h2>
            <p style={{color:T.textMuted,marginBottom:28,fontSize:14}}>Connect messaging services and configure automation rules.</p>

            <div style={{...card,marginBottom:20}}>
              <div style={{fontWeight:700,fontSize:15,marginBottom:16,color:T.text}}>🎨 App Theme</div>
              <div style={{display:"flex",gap:14}}>
                {Object.entries(THEMES).map(([key,th])=>(
                  <div key={key} onClick={()=>setThemeName(key)} style={{flex:1,padding:"18px 14px",borderRadius:12,cursor:"pointer",textAlign:"center",transition:"all .2s",border:themeName===key?`2px solid ${T.accent}`:`2px solid ${T.border}`,background:themeName===key?T.tagBg(T.accent):T.surface2}}>
                    <div style={{fontSize:28,marginBottom:8}}>{th.icon}</div>
                    <div style={{fontSize:13,fontWeight:700,color:themeName===key?T.accent:T.textSub}}>{th.name}</div>
                    <div style={{display:"flex",gap:4,justifyContent:"center",marginTop:10}}>
                      {(key==="dark"?["#08090d","#22d3ee","#3b82f6"]:key==="white"?["#f8fafc","#0ea5e9","#6366f1"]:["#0a1628","#1e90ff","#00c6ff"]).map((c,i)=>(
                        <div key={i} style={{width:14,height:14,borderRadius:"50%",background:c,border:`1px solid ${themeName==="white"?"#00000022":"#ffffff22"}`}}/>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {[
              {title:"✉️ SendGrid (Email)",fields:[["SendGrid API Key","sendgridKey","password","SG.xxx..."],["From Email","fromEmail","email","noreply@yourdomain.com"]]},
              {title:"💬 Twilio (SMS)",fields:[["Account SID","twilioSid","password","ACxxx..."],["Auth Token","twilioToken","password","..."],["From Phone","twilioFrom","tel","+15550000000"]]},
              {title:"📱 WhatsApp (Twilio)",fields:[["WhatsApp From","whatsappFrom","tel","whatsapp:+14155238886"]]},
            ].map(section=>(
              <div key={section.title} style={{...card,marginBottom:16}}>
                <div style={{fontWeight:700,fontSize:15,marginBottom:16,color:T.text}}>{section.title}</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  {section.fields.map(([l,key,type,ph])=>(
                    <div key={key}><span style={lbl}>{l.toUpperCase()}</span><input type={type} placeholder={ph} value={settings[key]} onChange={e=>setSettings(p=>({...p,[key]:e.target.value}))} style={inputStyle}/></div>
                  ))}
                </div>
              </div>
            ))}

            <div style={{...card,marginBottom:16}}>
              <div style={{fontWeight:700,fontSize:15,marginBottom:18,color:T.text}}>⚙️ Automatic Reminder Rules</div>
              {[["reminder21","Send reminder 21 days before rent (3 weeks)","#a78bfa"],["reminder7","Send reminder 7 days before rent (1 week)","#f59e0b"],["dueToday","Send alert on the rent due date","#f97316"]].map(([key,label,color])=>(
                <div key={key} style={{display:"flex",alignItems:"center",gap:14,padding:"13px 0",borderBottom:`1px solid ${T.border2}`}}>
                  <div onClick={()=>setSettings(p=>({...p,[key]:!p[key]}))} style={{width:44,height:24,borderRadius:12,background:settings[key]?color:T.border,cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}>
                    <div style={{position:"absolute",top:3,left:settings[key]?22:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.3)"}}/>
                  </div>
                  <span style={{fontSize:13,color:T.textSub}}>{label}</span>
                </div>
              ))}
              <div style={{marginTop:18,padding:16,background:T.surface2,borderRadius:10,border:`1px solid ${T.border}`}}>
                <div style={{fontSize:13,fontWeight:700,color:"#ef4444",marginBottom:12}}>⚠️ Overdue — Daily reminders every 24hrs until paid</div>
                <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
                  <div style={{fontSize:12,color:T.textMuted}}>Stop after</div>
                  <input type="number" min="1" max="60" value={settings.overdueMax} onChange={e=>setSettings(p=>({...p,overdueMax:Number(e.target.value)}))} style={{...inputStyle,width:70}}/>
                  <div style={{fontSize:12,color:T.textMuted}}>days</div>
                </div>
                <div style={{display:"flex",gap:10}}>
                  {Object.entries(chIcon).map(([c,icon])=>(
                    <div key={c} onClick={()=>setSettings(p=>({...p,overdueChannels:{...p.overdueChannels,[c]:!p.overdueChannels[c]}}))} style={{padding:"8px 16px",borderRadius:9,cursor:"pointer",border:`1px solid ${settings.overdueChannels[c]?"#ef444466":T.border}`,background:settings.overdueChannels[c]?"#ef444415":"transparent",transition:"all .15s",display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:16}}>{icon}</span>
                      <span style={{fontSize:12,fontWeight:600,color:settings.overdueChannels[c]?"#ef4444":T.textMuted,textTransform:"capitalize"}}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={()=>showToast("✅ Settings saved!","#10b981")} style={{...btnPrimary,padding:"11px 28px",fontSize:14}}>Save Settings</button>
          </div>
        )}
      </main>

      {/* ── Tenant Profile Panel ── */}
      {selectedTenant && (
        <TenantPanel
          tenant={selectedTenant}
          onClose={()=>setSelectedTenant(null)}
          onSave={saveTenantProfile}
          themeName={themeName}
        />
      )}

      {/* ── Send Manual Modal ── */}
      {showSendModal && (
        <div style={{position:"fixed",inset:0,background:"#00000099",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,backdropFilter:"blur(4px)"}}>
          <div style={{...card,minWidth:420,maxWidth:500,boxShadow:T.shadow}}>
            <div style={{fontWeight:800,fontSize:17,marginBottom:4,color:T.text}}>Send Notification</div>
            <div style={{color:T.textMuted,fontSize:13,marginBottom:20}}>to {tenants.find(t=>t.id===showSendModal)?.name}</div>
            <div style={{fontSize:10,color:T.textMuted,marginBottom:8,fontWeight:700,letterSpacing:"0.08em"}}>NOTIFICATION TYPE</div>
            <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:20}}>
              {Object.entries(NOTIF_TEMPLATES).map(([key,tmpl])=>(
                <div key={key} onClick={()=>setSendType(key)} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:10,cursor:"pointer",border:`1px solid ${sendType===key?tmpl.color+"66":T.border}`,background:sendType===key?T.tagBg(tmpl.color):"transparent",transition:"all .15s"}}>
                  <span style={{fontSize:17}}>{tmpl.icon}</span>
                  <span style={{fontSize:13,fontWeight:600,color:sendType===key?tmpl.color:T.textSub}}>{tmpl.label}</span>
                </div>
              ))}
            </div>
            <div style={{fontSize:10,color:T.textMuted,marginBottom:10,fontWeight:700,letterSpacing:"0.08em"}}>SEND VIA</div>
            <div style={{display:"flex",gap:10,marginBottom:24}}>
              {Object.entries(chIcon).map(([c,icon])=>(
                <div key={c} onClick={()=>setSendChannels(p=>({...p,[c]:!p[c]}))} style={{flex:1,padding:"10px",borderRadius:10,border:`1px solid ${sendChannels[c]?T.accent+"66":T.border}`,background:sendChannels[c]?T.tagBg(T.accent):"transparent",cursor:"pointer",textAlign:"center",transition:"all .15s"}}>
                  <div style={{fontSize:20}}>{icon}</div>
                  <div style={{fontSize:11,marginTop:4,color:sendChannels[c]?T.accent:T.textMuted,fontWeight:600,textTransform:"capitalize"}}>{c}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={sendManual} disabled={sending} style={{...btnPrimary,flex:1,padding:"11px",fontSize:14,opacity:sending?.7:1}}>{sending?"Sending…":"Send Now"}</button>
              <button onClick={()=>setShowSendModal(null)} style={{...btnSec,padding:"11px 20px"}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        *{box-sizing:border-box;}
      `}</style>
    </div>
  );
}
