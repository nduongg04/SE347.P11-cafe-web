import NavBar from "@/components/admin/NavBar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-row bg-[#F3F2F7]">
            <NavBar />
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default AdminLayout;
