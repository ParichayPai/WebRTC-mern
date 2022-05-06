import React from 'react'
import { useState } from 'react';
import { StepPhoneEmail } from '../Steps/StepPhoneEmail/StepPhoneEmail';
import { StepOtp } from '../Steps/StepOtp/StepOtp';

export const Login = () => {

    const Steps = {
        1: StepPhoneEmail,
        2: StepOtp,
    }
    const [step, setStep] = useState(1);
    const Step = Steps[step];
    function onNext(){
        setStep(step + 1);
    }
    return (
        <Step onNext = {onNext}/>
      )
}
