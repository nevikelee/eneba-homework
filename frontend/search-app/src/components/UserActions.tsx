import { Heart, ShoppingCart, User } from "lucide-react";

function UserActions() {
  return (
    <div style={styles.actions}>
      <Heart size={24} color="#fff" style={styles.icon} />
      <ShoppingCart size={24} color="#fff" style={styles.icon} />

      <div style={styles.avatarWrapper}>
        <User size={20} color="#fff" />
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  icon: {
    cursor: "pointer",
    display: "block",
  },
  avatarWrapper: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
};

export default UserActions;
