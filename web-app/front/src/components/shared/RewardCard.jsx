import Button from '../ui/Button'

export default function RewardCard({ reward, userPoints }) {
  const canRedeem = userPoints >= reward.pts

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(255,77,184,0.08)] p-4 flex flex-col gap-2.5 hover:shadow-[0_4px_24px_rgba(255,77,184,0.13)] transition-all">
      <span className="text-[28px]">{reward.emoji}</span>
      <div className="font-bold text-[13px] text-[#1F2937]">{reward.title}</div>
      <div className="text-[11px] text-[#64748B]">{reward.desc}</div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[12px] font-bold text-[#FF4DB8] flex items-center gap-1">⭐ {reward.pts} pts</span>
        {canRedeem
          ? <Button size="xs">Canjear</Button>
          : <span className="text-[11px] text-[#64748B]">Sin puntos</span>
        }
      </div>
    </div>
  )
}