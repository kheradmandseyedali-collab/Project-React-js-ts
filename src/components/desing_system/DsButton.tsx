import type { ButtonProps } from "@mui/material/Button";
import Button from "@mui/material/Button";
import { LoaderCircle } from "lucide-react";

type PropTypes = ButtonProps & {
    tooltip ?: string ,
    loading ?: boolean
}

const Ds_Button = ({ variant = "contained", ...props } : PropTypes) => {
    return (
        <>
            <Button
            type={props.type}
            size={props.size}
            color={props.color}
            variant={variant}
            className={`rounded-full ${props.className} h-auto`}
            onClick={props.onClick}
            >
                {!props.loading && props.startIcon ? props.startIcon : undefined}
                {props.loading ? <LoaderCircle size={26} className="animate-spin"/> : undefined}
                {props.children}
            </Button>
        </>
    )
}

export default Ds_Button ;











// import { Button } from "@mui/material";
// import type { ButtonProps } from "@mui/material/Button";
// import { LoaderCircle } from "lucide-react";
// // import React , type { FC } ;
// import type {FC} from "react" ;

// type Ds_ButtonProps = {
//   loading?: boolean;
//   tooltip?: string;
// } & ButtonProps;

// const Ds_Button: FC<Ds_ButtonProps> = ({
//   loading,
//   children,
//   startIcon,
//   className = "",
//   disabled,
//   ...props
// }) => {
//   return (
//     <Button
//       {...props}
//       disabled={disabled || loading}
//       variant={props.variant || "contained"}
//       startIcon={!loading ? startIcon : undefined}
//       className={`rounded-xl normal-case font-medium transition-all duration-200 shadow-sm active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
//     >
//       {loading ? (
//         <span className="flex items-center gap-2">
//           <LoaderCircle size={18} className="animate-spin" />
//           {children}
//         </span>
//       ) : (
//         children
//       )}
//     </Button>
//   );
// };

// export default Ds_Button ;  