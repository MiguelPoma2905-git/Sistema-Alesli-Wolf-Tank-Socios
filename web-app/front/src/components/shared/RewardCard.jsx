import Button from '../ui/Button'

export default function RewardCard({ reward, userPoints }) {
  const canRedeem = userPoints >= reward.pts

  return (
<<<<<<< HEAD
    <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(255,77,184,0.08)] p-4 flex flex-col gap-2.5 hover:shadow-[0_4px_24px_rgba(255,77,184,0.13)] transition-all">
      <span className="text-[28px]">{reward.emoji}</span>
      <div className="font-bold text-[13px] text-[#1F2937]">{reward.title}</div>
      <div className="text-[11px] text-[#64748B]">{reward.desc}</div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[12px] font-bold text-[#FF4DB8] flex items-center gap-1">⭐ {reward.pts} pts</span>
        {canRedeem
          ? <Button size="xs">Canjear</Button>
          : <span className="text-[11px] text-[#64748B]">Sin puntos</span>
=======
    <div className="bg-white dark:bg-[#151522] border border-border-light/30 dark:border-white/10 shadow-sm p-4 flex flex-col gap-2.5 hover:shadow-card-md transition-all">
      <div className="w-[28px] h-[28px] rounded-lg bg-primary/20"></div>
      <div className="font-bold text-[13px] text-text-dark dark:text-white">{reward.title}</div>
      <div className="text-[11px] text-text-muted">{reward.desc}</div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[12px] font-bold text-primary flex items-center gap-1">⭐ {reward.pts} pts</span>
        {canRedeem
          ? <Button size="xs">Canjear</Button>
          : <span className="text-[11px] text-text-muted">Sin puntos</span>
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
        }
      </div>
    </div>
  )
}