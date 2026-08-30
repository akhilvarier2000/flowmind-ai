import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">
          <Icon size={20} />
        </div>
      </div>

      <div className="stat-value">{value}</div>

      <div className="stat-title">{title}</div>

      <div className="stat-description">
        {description}
      </div>
    </div>
  );
}