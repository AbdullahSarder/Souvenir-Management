export default function AwaitingApproval() {
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow max-w-lg">
        <h1 className="text-2xl font-bold mb-2">Awaiting Approval</h1>
        <p>
          Your account is created but not approved yet. Please contact the
          owner/admin.
        </p>
      </div>
    </div>
  );
}
