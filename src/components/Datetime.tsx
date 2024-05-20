export interface Props {
  datetime: string | Date;
  size?: "sm" | "lg";
  className?: string;
}

export default function Datetime({ datetime, size = "sm", className }: Props) {
  return (
    <div className={`flex items-center space-x-2 opacity-80 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          size === "sm" ? "scale-90" : "scale-100"
        } inline-block h-6 w-6 fill-skin-base`}
        aria-hidden="true"
      >
        <path d="M128 8c0-4.4-3.6-8-8-8s-8 3.6-8 8V64H64C28.7 64 0 92.7 0 128v48 16 96 16 96 16 32c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V416 400 304 288 192 176 128c0-35.3-28.7-64-64-64H336V8c0-4.4-3.6-8-8-8s-8 3.6-8 8V64H128V8zM432 288H304V192H432v96zM288 192v96H160V192H288zm-144 0v96H16V192H144zM16 304H144v96H16V304zm0 112H144v80H64c-26.5 0-48-21.5-48-48V416zm144 80V416H288v80H160zm144 0V416H432v32c0 26.5-21.5 48-48 48H304zm128-96H304V304H432v96zM112 80v40c0 4.4 3.6 8 8 8s8-3.6 8-8V80H320v40c0 4.4 3.6 8 8 8s8-3.6 8-8V80h48c26.5 0 48 21.5 48 48v48H16V128c0-26.5 21.5-48 48-48h48zM288 400H160V304H288v96z"></path>
        <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
      </svg>
      <span className="sr-only">Posted on:</span>
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        <FormattedDatetime datetime={datetime} />
      </span>
    </div>
  );
}

const FormattedDatetime = ({ datetime }: { datetime: string | Date }) => {
  const myDatetime = new Date(datetime);

  const date = myDatetime.toLocaleDateString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = myDatetime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {date}
      <span aria-hidden="true"> | </span>
      <span className="sr-only">&nbsp;at&nbsp;</span>
      {time}
    </>
  );
};
