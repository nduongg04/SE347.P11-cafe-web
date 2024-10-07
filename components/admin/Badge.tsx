import Image from "next/image";

type BadgeProps = {
    iconHref: string;
    value: string;
    title: string;
};

const Badge = ({ iconHref, value, title }: BadgeProps) => {
    return (
        <div className="flex flex-1 items-center justify-center gap-4 rounded-md bg-white px-9 py-4 text-black-purple shadow-[0_4px_4px_0_rgba(0,0,0,0.04)]">
            <div className="flex aspect-square items-center justify-center rounded-full bg-dark-green/15 p-2">
                <Image
                    src={iconHref}
                    alt={title}
                    width={50}
                    height={50}
                    className="w-[50px]"
                />
            </div>
            <div className="flex flex-col">
                <span className="text-4xl font-bold">{value}</span>
                <span className="text-sm">{title}</span>
            </div>
        </div>
    );
};
export default Badge;
