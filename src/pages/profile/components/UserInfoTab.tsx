export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  gender: string;
  image: string;
}

type UserInfoTabProps = {
  user: User | null;
}

const UserInfoTab = ({ user }: UserInfoTabProps) => {
  if (!user) {
    return (
      <div className="flex items-center justify-center p-8 text-slate-400">
        در حال بارگذاری اطلاعات کاربر...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold pb-3 border-b border-slate-700">
        اطلاعات حساب کاربری
      </h2>
      <div className="flex items-center gap-4">
        <figure className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-700 p-1 shrink-0 border border-slate-600">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-full object-cover rounded-xl"
          />
        </figure>

        <div className="space-y-1">
          <h3 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h3>
          <span className="text-sm text-slate-400">
            شناسه کاربری: {user.id}#
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
          <span className="text-xs text-slate-400 block mb-1">نام و نام خانوادگی</span>
          <p className="font-medium text-slate-200">{user.firstName} {user.lastName}</p>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
          <span className="text-xs text-slate-400 block mb-1">آدرس ایمیل</span>
          <p className="font-medium text-slate-200">{user.email}</p>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
          <span className="text-xs text-slate-400 block mb-1">نام کاربری</span>
          <p className="font-medium text-slate-200">@{user.username}</p>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
          <span className="text-xs text-slate-400 block mb-1">جنسیت</span>
          <p className="font-medium text-slate-200">
            {user.gender === 'male' ? 'مرد' : user.gender === 'female' ? 'زن' : user.gender}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserInfoTab ;