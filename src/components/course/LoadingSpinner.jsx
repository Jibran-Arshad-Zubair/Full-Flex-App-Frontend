import { useEffect, useState } from "react";

export default function LoadingSpinner({ size = 'medium', text = 'Loading...' }) {
  const [activeIcon, setActiveIcon] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  const icons = [
    { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>, label: "Courses" },
    { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>, label: "Teachers" },
    { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/></svg>, label: "Students" },
    { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/></svg>, label: "Videos" },
    { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>, label: "Certificates" },
  ];

  const tips = [
    "✨ Explore thousands of expert-led courses",
    "🎓 Learn at your own pace, anytime",
    "📚 New courses added every week",
    "🏆 Earn certificates & boost your career",
    "👩‍🏫 Learn directly from industry experts",
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveIcon(p => (p + 1) % icons.length), 800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTipIndex(p => (p + 1) % tips.length), 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setProgress(0);
    const t = setInterval(() => {
      setProgress(p => { if (p >= 85) { clearInterval(t); return 85; } return p + Math.random() * 12; });
    }, 300);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Sora:wght@400;600;700&display=swap');
        @keyframes floatUp { 0%,100%{transform:translateY(0) scale(1);opacity:1} 50%{transform:translateY(-12px) scale(1.08);opacity:.9} }
        @keyframes pulseRing { 0%{transform:scale(.95);box-shadow:0 0 0 0 rgba(59,130,246,.5)} 70%{transform:scale(1);box-shadow:0 0 0 18px rgba(59,130,246,0)} 100%{transform:scale(.95);box-shadow:0 0 0 0 rgba(59,130,246,0)} }
        @keyframes orbit  { from{transform:rotate(0deg)   translateX(52px) rotate(0deg)}   to{transform:rotate(360deg)  translateX(52px) rotate(-360deg)} }
        @keyframes orbit2 { from{transform:rotate(120deg) translateX(52px) rotate(-120deg)} to{transform:rotate(480deg)  translateX(52px) rotate(-480deg)} }
        @keyframes orbit3 { from{transform:rotate(240deg) translateX(52px) rotate(-240deg)} to{transform:rotate(600deg)  translateX(52px) rotate(-600deg)} }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes iconPop { 0%{transform:scale(.7);opacity:0} 60%{transform:scale(1.15);opacity:1} 100%{transform:scale(1);opacity:1} }
        @keyframes bgFloat1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-30px) scale(1.05)} }
        @keyframes bgFloat2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-25px,20px) scale(1.08)} }
        .ldr-float{animation:floatUp 2.4s ease-in-out infinite}
        .ldr-pulse{animation:pulseRing 2s ease-in-out infinite}
        .ldr-o1{animation:orbit 2.8s linear infinite}
        .ldr-o2{animation:orbit2 2.8s linear infinite}
        .ldr-o3{animation:orbit3 2.8s linear infinite}
        .tip-fade{animation:fadeSlideIn .5s ease-out forwards}
        .icon-pop{animation:iconPop .4s cubic-bezier(.34,1.56,.64,1) forwards}
        .blob1{animation:bgFloat1 7s ease-in-out infinite}
        .blob2{animation:bgFloat2 9s ease-in-out infinite}
        .shimbar{background:linear-gradient(90deg,#3b82f6 0%,#60a5fa 40%,#93c5fd 50%,#60a5fa 60%,#3b82f6 100%);background-size:200% auto;animation:shimmer 1.8s linear infinite}
      `}</style>

      <div style={{fontFamily:"'Nunito',sans-serif",position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',background:'#020817'}}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="blob1 absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20" style={{background:'radial-gradient(circle,#3b82f6,transparent 70%)'}}/>
          <div className="blob2 absolute -bottom-40 -right-40 rounded-full opacity-15" style={{width:500,height:500,background:'radial-gradient(circle,#6366f1,transparent 70%)'}}/>
          <div className="absolute inset-0 opacity-5" style={{backgroundImage:'linear-gradient(rgba(148,163,184,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.3) 1px,transparent 1px)',backgroundSize:'40px 40px'}}/>
        </div>

        <div style={{position:'relative',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',padding:'48px 40px',borderRadius:24,background:'rgba(15,23,42,0.88)',backdropFilter:'blur(24px)',border:'1px solid rgba(99,102,241,.25)',boxShadow:'0 0 80px rgba(59,130,246,.15),0 32px 64px rgba(0,0,0,.5)',minWidth:340,maxWidth:400}}>

          <div style={{marginBottom:32,display:'flex',alignItems:'center',gap:8,padding:'6px 16px',borderRadius:999,background:'rgba(59,130,246,.12)',border:'1px solid rgba(59,130,246,.3)'}}>
            <div style={{width:8,height:8,borderRadius:'50%',background:'#60a5fa',boxShadow:'0 0 6px #60a5fa'}}/>
            <span style={{fontFamily:"'Sora',sans-serif",fontSize:11,letterSpacing:'0.12em',color:'#60a5fa',fontWeight:700,textTransform:'uppercase'}}>EduLearn Platform</span>
          </div>

          <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:32,width:130,height:130}}>
            <div style={{position:'absolute',inset:0,borderRadius:'50%',border:'1px dashed rgba(99,102,241,.2)'}}/>
            <div style={{position:'absolute',width:130,height:130,top:0,left:0}}>
              <div className="ldr-o1" style={{position:'absolute',top:'50%',left:'50%',marginTop:-6,marginLeft:-6,width:12,height:12,borderRadius:'50%',background:'#60a5fa',boxShadow:'0 0 8px #60a5fa'}}/>
              <div className="ldr-o2" style={{position:'absolute',top:'50%',left:'50%',marginTop:-4,marginLeft:-4,width:8,height:8,borderRadius:'50%',background:'#818cf8',boxShadow:'0 0 6px #818cf8'}}/>
              <div className="ldr-o3" style={{position:'absolute',top:'50%',left:'50%',marginTop:-4,marginLeft:-4,width:8,height:8,borderRadius:'50%',background:'#22d3ee',boxShadow:'0 0 6px #22d3ee'}}/>
            </div>
            <div className="ldr-pulse" style={{position:'relative',width:80,height:80,borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#1e40af,#4f46e5)',boxShadow:'0 8px 32px rgba(59,130,246,.4)'}}>
              <div className="ldr-float">
                {icons.map((icon, i) => (
                  <div key={i} className={i === activeIcon ? 'icon-pop' : 'hidden'} style={{color:'white'}}>{icon.svg}</div>
                ))}
              </div>
            </div>
          </div>

          <div style={{height:20,display:'flex',alignItems:'center',marginBottom:4}}>
            <span key={activeIcon} className="tip-fade" style={{fontSize:11,fontWeight:700,color:'#60a5fa',textTransform:'uppercase',letterSpacing:'0.1em'}}>{icons[activeIcon].label}</span>
          </div>

          <h2 style={{fontFamily:"'Sora',sans-serif",marginTop:12,fontSize:20,fontWeight:700,color:'white',textAlign:'center',lineHeight:1.4}}>
            Preparing your<br/>
            <span style={{background:'linear-gradient(90deg,#60a5fa,#a78bfa,#38bdf8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Learning Experience</span>
          </h2>

          <div style={{marginTop:24,width:'100%'}}>
            <div style={{width:'100%',height:6,borderRadius:999,overflow:'hidden',background:'rgba(99,102,241,.15)'}}>
              <div className="shimbar" style={{height:'100%',borderRadius:999,width:`${Math.min(progress,85)}%`,transition:'width 0.5s ease'}}/>
            </div>
            <div style={{marginTop:8,display:'flex',justifyContent:'space-between'}}>
              <span style={{fontSize:11,color:'#475569',fontWeight:500}}>Loading resources...</span>
              <span style={{fontSize:11,color:'#60a5fa',fontWeight:700}}>{Math.round(Math.min(progress,85))}%</span>
            </div>
          </div>

          <div style={{marginTop:24,width:'100%',borderRadius:12,padding:'12px 16px',background:'rgba(59,130,246,.07)',border:'1px solid rgba(59,130,246,.12)'}}>
            <p key={tipIndex} className="tip-fade" style={{textAlign:'center',fontSize:12,color:'#94a3b8',fontWeight:500,lineHeight:1.6,margin:0}}>{tips[tipIndex]}</p>
          </div>

          <div style={{marginTop:24,display:'flex',alignItems:'center',gap:12}}>
            {icons.map((icon, i) => (
              <div key={i} style={{width:32,height:32,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',transition:'all .3s',background:i===activeIcon?'rgba(59,130,246,.25)':'rgba(255,255,255,.04)',border:i===activeIcon?'1px solid rgba(59,130,246,.5)':'1px solid rgba(255,255,255,.06)',color:i===activeIcon?'#60a5fa':'#475569',transform:i===activeIcon?'scale(1.15)':'scale(1)'}}>
                <div style={{width:14,height:14}}>{icon.svg}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}