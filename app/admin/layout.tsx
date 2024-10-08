import NavBar from "@/components/admin/NavBar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-row w-screen bg-[#F3F2F7]">
			<NavBar />
			<div className="w-[100%]">
			{children}
			</div>
		</div>
	);
};

export default AdminLayout;
