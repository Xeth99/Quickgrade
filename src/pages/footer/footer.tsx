interface FooterProps {
  className?: string;
}
function Footer(props: FooterProps) {
  return (
    <>
      <footer className={`${props.className} mx-auto overflow-y-hidden mt-8`}>
        <div className="flex justify-evenly items-center gap-2">
          <div className="text-[12px] md:text-[16px]">
            <p className="footer-text">QuickGrade</p>
          </div>
          <div className="text-[12px] md:text-[16px] md:flex md:justify-between md:items-center md:gap-4">
            <p className="footer-text">QuickGrade Inc. </p>{" "}
            <p> All rights Reserved</p>
          </div>
          <div className="text-[12px] md:text-[16px] flex justify-center items-center gap-4 text-primaryVar">
            <p>Privacy</p>
            <p>Terms</p>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
