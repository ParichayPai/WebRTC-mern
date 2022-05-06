import React from 'react'
import { useState } from 'react'
import { StepAvatar } from '../Steps/StepAvatar/StepAvatar'
import { StepOtp } from '../Steps/StepOtp/StepOtp'
import { StepPhoneEmail } from '../Steps/StepPhoneEmail/StepPhoneEmail'
import { StepName } from '../Steps/StepName/StepName'
import { StepUsername } from '../Steps/StepUsername/StepUsername'

// import styles from './Register.module.css'

const Steps = {
    1: StepPhoneEmail,
    2: StepOtp,
    3: StepName,
    4: StepAvatar,
    5: StepUsername,
}

export const Register = () => {
    const [step, setStep] = useState(1);
    const Step = Steps[step];
    function onNext(){
        setStep(step + 1);
    }
  return (
    <div><Step onNext = {onNext}/></div>
  )
}
