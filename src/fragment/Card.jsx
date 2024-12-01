import figma from "../assets/Image/figma.svg";
import date from "../assets/Image/date.svg";
import budi from "../assets/Image/budi.svg";

const Card = (props) => {
    const {children} = props;
    return (
        <div className="border-2 rounded-[20px] bg-white max-w-[420px] max-h-[1200px] text-[#003266] shadow-lg">
            <div className="p-[24px] gap-y-[12px] flex flex-col">
                {children}
            </div>
        </div>
    );
};

const Body = (props) => {
    const {children,title} = props;
    return(
        <div>
            <h1 className="font-semibold text-[26px]">{title}</h1>
            <p className="text-[16px] font-normal">{children}</p>
        </div>
    );
};

const Kategori = (props) => {
    const {children,kategori} = props;
    return(
        <div className="flex gap-x-[4px] text-white">
                    <p className="border bg-[#027FFF] rounded-[20px] p-[4px] w-[122px] justify-center flex ">{kategori}</p>
                    <p className="border bg-[#027FFF] rounded-[20px] p-[4px] w-[122px] justify-center flex ">{children}</p>
                </div>
    );
};

const Image = (props) => {
    const { image } = props;
    return (
        <div className="w-full h-[200px] overflow-hidden rounded-t-[20px]">
            <img
                src={image}
                alt=""
                className="w-full h-full object-cover"
            />
        </div>
    );
};


const Tanggal = (props) => {
    const {children} = props;
    return(
        <div className="flex gap-x-[12px]">
                    <img src={date} alt="" />
                    <p className="text-[16px] font-normal">{children}</p>
                </div>
    );
};

const Creator = (props) => {
    const { image, nama, title } = props;
    return (
        <div className="flex gap-x-[16px] items-center">
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                <img
                    src={image}
                    alt={nama}
                    className="w-full h-full object-cover"
                />
            </div>
            <div>
                <p className="font-medium text-[16px]">{nama}</p>
                <p className="font-normal text-[14px]">{title}</p>
            </div>
        </div>
    );
};

Card.Body = Body;
Card.Creator = Creator;
Card.Image = Image;
Card.Tanggal = Tanggal;
Card.Kategori = Kategori;

export default Card;
