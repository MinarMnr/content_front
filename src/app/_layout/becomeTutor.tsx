import Image from "next/image";

const BecomeTutor = ({ ...props }: any) => {
  return (
    <>
      <div {...props} className={`mt-20 grid grid-cols-1  ${props?.className}`}>
        <Image
          src={"/tutor.png"}
          alt="Become a Tutor"
          width={477}
          height={250}
          className="ml-[250px] become-img"
        />
        <div className="relative become-section bg-green-800">
          <div className="container mx-auto">
          <div className="pt-[60px]">
            <h2 className="text-4xl text-white">BECOME A TUTOR TODAY</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
           <div className="become-left">
           <p className="text-md font-normal text-white  pt-6">
              Teach what you love. Edutube gives you the opportunity to create
              courses, take live classes, help students by solving their
              problems and selling your notes suggestion online. Join
              international tutor community and build your profile.
            </p>
           </div>

            <div className="becoame-member">
            <button className="text-2xl float-right px-6 py-2 text-white border border-dashed border-green-500 bg-green-700 hover:bg-green-800  rounded-[40px]">
              Become a Tutor
            </button>
            </div>
            </div>
      
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeTutor;
