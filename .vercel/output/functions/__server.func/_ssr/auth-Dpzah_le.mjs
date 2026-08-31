import { i as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./ssr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Dpzah_le.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(void 0);
var AuthProvider = ({ children }) => {
	const [user, setUser] = (0, import_react.useState)(null);
	const [session, setSession] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [roles, setRoles] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const fetchUserData = async (currentUser) => {
		if (!currentUser) {
			setProfile(null);
			setRoles([]);
			return;
		}
		try {
			const { data: profData } = await supabase.from("profiles").select("*").eq("id", currentUser.id).maybeSingle();
			if (profData) setProfile(profData);
			else setProfile({
				id: currentUser.id,
				username: currentUser.email?.split("@")[0] || "user",
				display_name: currentUser.user_metadata?.display_name || currentUser.email?.split("@")[0] || "User",
				bio: null,
				avatar_url: currentUser.user_metadata?.avatar_url || null,
				website: null,
				is_creator: false,
				created_at: currentUser.created_at,
				updated_at: currentUser.created_at
			});
			const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", currentUser.id);
			if (roleData && roleData.length > 0) setRoles(roleData.map((r) => r.role));
			else setRoles(["user"]);
		} catch (err) {
			console.error("Error fetching user profile/roles:", err);
		}
	};
	(0, import_react.useEffect)(() => {
		let isMounted = true;
		async function initAuth() {
			try {
				const { data } = await supabase.auth.getSession();
				if (isMounted) {
					setSession(data.session);
					setUser(data.session?.user ?? null);
					if (data.session?.user) await fetchUserData(data.session.user);
				}
			} catch (err) {
				console.error("Error checking auth session:", err);
			} finally {
				if (isMounted) setLoading(false);
			}
		}
		initAuth();
		const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
			if (isMounted) {
				setSession(newSession);
				setUser(newSession?.user ?? null);
				if (newSession?.user) await fetchUserData(newSession.user);
				else {
					setProfile(null);
					setRoles([]);
				}
				setLoading(false);
			}
		});
		return () => {
			isMounted = false;
			listener.subscription.unsubscribe();
		};
	}, []);
	const signInWithEmail = async (email, password) => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		return { error };
	};
	const signUpWithEmail = async (email, password, displayName) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: { display_name: displayName || email.split("@")[0] } }
		});
		if (!error && data.user) await supabase.from("profiles").upsert({
			id: data.user.id,
			display_name: displayName || email.split("@")[0],
			username: (email.split("@")[0] + "-" + Math.random().toString(36).substring(2, 6)).toLowerCase()
		});
		return { error };
	};
	const signOut = async () => {
		await supabase.auth.signOut();
		setUser(null);
		setSession(null);
		setProfile(null);
		setRoles([]);
	};
	const refreshProfile = async () => {
		if (user) await fetchUserData(user);
	};
	const isAdmin = roles.includes("admin");
	const isStaff = roles.includes("admin") || roles.includes("moderator");
	const isCreator = profile?.is_creator || isStaff;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			session,
			profile,
			roles,
			loading,
			isAdmin,
			isStaff,
			isCreator,
			signInWithEmail,
			signUpWithEmail,
			signOut,
			refreshProfile
		},
		children
	});
};
var useAuth = () => {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
//#endregion
export { useAuth as n, AuthProvider as t };
