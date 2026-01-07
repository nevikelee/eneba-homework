const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      maxWidth: "1240px",
      margin: "0 auto",
      padding: "0 20px",
      width: "100%",
      boxSizing: "border-box",
    }}
  >
    {children}
  </div>
);

export default PageContainer;
