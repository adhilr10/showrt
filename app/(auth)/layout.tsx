const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return ( 
      <div className="flex items-center justify-center pt-28">
        {children}
      </div>
     );
  }
   
  export default AuthLayout;