import React from "react";

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {[
        "User Login",
        "Shipping Address",
        "You Good For It?",
        "Place Order",
      ].map((step, index) => (
        <div
          key={step}
          className={`flex-1 border-b-2  
          text-center 
       ${
         index <= activeStep
           ? "border-orange   text-orange"
           : "border-Gray text-Gray"
       }
          
       `}
        >
          {step}
        </div>
      ))}
    </div>
  );
}
