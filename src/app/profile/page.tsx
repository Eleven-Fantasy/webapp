"use client";
import MainHeader from "@/components/MainHeader";
import Tabs from "@/components/Tabs";
import Image from "next/image";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProfilePage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/signin");
        }
    }, [status, router]);

    const { data: points } = useQuery({
        queryKey: ["points"],
        queryFn: async () => {
            const response = await axios.get("/api/points");
            return response.data;
        },
        enabled: status === "authenticated",
    });

    const totalPoints = typeof points === "number" ? points : 0;

    if (status === "loading") {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-tetiary rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) {
        return null;
    }

    // Mock data - replace with actual API calls when available
    const userStats = {
        rank: 18,
        matchesPlayed: 24,
        winRate: 68,
        totalWins: 16,
        totalLosses: 8,
        currentStreak: 3,
    };

    const recentActivity = [
        {
            id: 1,
            type: "match",
            title: "Match Prediction",
            description: "Arsenal vs Chelsea",
            points: 150,
            date: "2 days ago",
            status: "won",
        },
        {
            id: 2,
            type: "match",
            title: "Match Prediction",
            description: "Liverpool vs Man City",
            points: 200,
            date: "5 days ago",
            status: "won",
        },
        {
            id: 3,
            type: "match",
            title: "Match Prediction",
            description: "Tottenham vs Brighton",
            points: 0,
            date: "1 week ago",
            status: "lost",
        },
    ];

    const StatCard = ({
        icon,
        label,
        value,
        subtitle,
    }: {
        icon: string;
        label: string;
        value: string | number;
        subtitle?: string;
    }) => (
        <div className="bg-white rounded-[1rem] p-4 flex flex-col gap-2 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2">
                <Image src={icon} alt={label} width={20} height={20} />
                <p className="text-[11px] font-[500] text-gray-600">{label}</p>
            </div>
            <p className="text-[24px] font-[700] leading-none text-secondary">
                {value}
            </p>
            {subtitle && (
                <p className="text-[10px] font-[400] text-gray-500">
                    {subtitle}
                </p>
            )}
        </div>
    );

    return (
        <div className="w-full h-full pb-[4rem]">
            <MainHeader />
            <div className="flex flex-col gap-5 pb-[4rem] overflow-y-auto">
                {/* Profile Header */}
                <div className="w-full bg-gradient-to-b from-white via-accent/20 to-accent min-h-[180px] p-[1rem] relative">
                    <div className="absolute bottom-[-45px] left-[1rem] flex items-end gap-3">
                        <div className="relative">
                            {session.user?.image ? (
                                <Image
                                    src={session.user.image}
                                    alt="profile"
                                    width={100}
                                    height={100}
                                    className="size-[90px] rounded-full border-4 border-white shadow-lg object-cover"
                                />
                            ) : (
                                <Image
                                    src="/images/avatar.webp"
                                    alt="profile"
                                    width={100}
                                    height={100}
                                    className="size-[90px] rounded-full border-4 border-white shadow-lg"
                                />
                            )}
                            <div className="absolute -bottom-1 -right-1 bg-accent rounded-full p-1 border-2 border-white">
                                <Image
                                    src="/images/trophy.webp"
                                    alt="verified"
                                    width={16}
                                    height={16}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 pb-2">
                            <p className="text-[20px] font-[800] leading-none text-secondary">
                                {session.user?.name || "Fantasy Manager"}
                            </p>
                            <p className="text-[12px] font-[500] text-gray-600">
                                {session.user?.walletAddress
                                    ? `${session.user.walletAddress.slice(
                                          0,
                                          6
                                      )}...${session.user.walletAddress.slice(
                                          -4
                                      )}`
                                    : session.user?.email || "No wallet"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* User Info Section */}
                <div className="px-[1rem]  flex flex-col gap-5">
                    {/* Total Points Card */}
                    <div className="w-full bg-gradient-to-br from-accent/10 via-accent/5 to-white rounded-[1rem] p-5 border border-accent/20">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <p className="text-[12px] font-[500] text-gray-600">
                                    Total Points
                                </p>
                                <p className="text-[36px] font-[800] leading-none text-tetiary">
                                    {totalPoints.toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-accent/20 rounded-full p-4">
                                <Image
                                    src="/images/trophy.webp"
                                    alt="trophy"
                                    width={32}
                                    height={32}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <StatCard
                            icon="/images/trophy.webp"
                            label="Global Rank"
                            value={`#${userStats.rank}`}
                            subtitle="Top 5%"
                        />
                        <StatCard
                            icon="/images/trophy.webp"
                            label="Matches"
                            value={userStats.matchesPlayed}
                            subtitle="Total played"
                        />
                        <StatCard
                            icon="/images/trophy.webp"
                            label="Win Rate"
                            value={`${userStats.winRate}%`}
                            subtitle={`${userStats.totalWins}W - ${userStats.totalLosses}L`}
                        />
                        <StatCard
                            icon="/images/trophy.webp"
                            label="Streak"
                            value={userStats.currentStreak}
                            subtitle="Wins in a row"
                        />
                    </div>

                    {/* Performance Section */}
                    <div className="flex flex-col gap-3">
                        <p className="text-[17px] font-[700] leading-none">
                            Performance
                        </p>
                        <div className="bg-white rounded-[1rem] p-4 border border-gray-100">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-[13px] font-[600]">
                                    Win Rate
                                </p>
                                <p className="text-[13px] font-[700] text-accent">
                                    {userStats.winRate}%
                                </p>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-accent to-tetiary h-full rounded-full transition-all"
                                    style={{ width: `${userStats.winRate}%` }}
                                />
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                <div className="flex flex-col">
                                    <p className="text-[11px] font-[500] text-gray-500">
                                        Wins
                                    </p>
                                    <p className="text-[18px] font-[700] text-green-600">
                                        {userStats.totalWins}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[11px] font-[500] text-gray-500">
                                        Losses
                                    </p>
                                    <p className="text-[18px] font-[700] text-red-600">
                                        {userStats.totalLosses}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="flex flex-col gap-3">
                        <p className="text-[17px] font-[700] leading-none">
                            Recent Activity
                        </p>
                        <div className="flex flex-col gap-2">
                            {recentActivity.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="bg-white rounded-[1rem] p-4 border border-gray-100 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <div
                                            className={`rounded-full p-2 ${
                                                activity.status === "won"
                                                    ? "bg-green-100"
                                                    : "bg-red-100"
                                            }`}
                                        >
                                            <Image
                                                src="/images/trophy.webp"
                                                alt="activity"
                                                width={20}
                                                height={20}
                                                className={
                                                    activity.status === "won"
                                                        ? "opacity-100"
                                                        : "opacity-50"
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 flex-1">
                                            <p className="text-[13px] font-[600] leading-none">
                                                {activity.title}
                                            </p>
                                            <p className="text-[11px] font-[400] text-gray-600">
                                                {activity.description}
                                            </p>
                                            <p className="text-[10px] font-[400] text-gray-400">
                                                {activity.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <p
                                            className={`text-[16px] font-[700] leading-none ${
                                                activity.status === "won"
                                                    ? "text-green-600"
                                                    : "text-gray-400"
                                            }`}
                                        >
                                            {activity.status === "won"
                                                ? "+"
                                                : ""}
                                            {activity.points}
                                        </p>
                                        <p className="text-[10px] font-[400] text-gray-400">
                                            pts
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sign Out Button */}
                    <div className="flex flex-col gap-3 mt-4">
                        <button
                            onClick={() => signOut({ callbackUrl: "/signin" })}
                            className="w-full bg-red-50 hover:bg-red-100 text-red-600 rounded-[1rem] p-4 border border-red-200 font-[600] text-[14px] transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
            <Tabs />
        </div>
    );
};

export default ProfilePage;
