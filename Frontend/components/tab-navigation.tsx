"use client";

type TabType = "Coffee" | "Food" | "Drinks";

interface TabNavigationProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string; emoji: string }[] = [
    { id: "Coffee", label: "Cafés", emoji: "☕" },
    { id: "Food", label: "Lanches", emoji: "🥐" },
    { id: "Drinks", label: "Bebidas", emoji: "🥤" },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
    return (
        <div className="flex gap-4 border-b border-border mb-8">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 font-semibold transition-colors ${
                        activeTab === tab.id
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    <span>{tab.emoji}</span>
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
