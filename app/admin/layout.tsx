import NavBar from "@/components/admin/NavBar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-row bg-[#F3F2F7]">
			<NavBar />
			{children}
		</div>
	);
};

export default AdminLayout;
