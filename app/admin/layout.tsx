import NavBar from "@/components/admin/NavBar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-row bg-red-500 size-96">
			<NavBar />
			{children}
		</div>
	);
};

export default AdminLayout;
