export default function MainContent({ menu }:{ menu: any}) {
  return (
    <div className="flex-1 p-6 min-h-screen w-full rounded-tl-xl shadow-xl  ">
      {menu === "Dashboard" && <h1></h1>}
      {menu === "Profile" && <h1>👤 Ini halaman Profile</h1>}
      {menu === "Settings" && <h1>⚙️ Ini halaman Settings</h1>}
    </div>
  );
}
