import React, {useRef, useState} from "react";
import './NewTimer.css'

// Sounds
import ClickSoundM from './../../Sounds/click.mp3'
import EndSoundM from './../../Sounds/stopTime.mp3'




// Imgs
import CheckFill from './img/checkfill.svg'
import Check from './img/check.svg'



var intervalId;


function NewTimer() {
    
    
    
    function handlerTime() {
        
        if (inputMinutes.current.value === '0' || inputMinutes.current.value === '00') {
            

            if (inputSecs.current.value === '0' || inputSecs.current.value === '00') {

                clearInterval(handlerId)
                clearInterval(intervalId)
                EndSound.play();
        
                setPause(true)
                mainButton.current.innerHTML = 'START'


            }
    
        }
        
        
    
    
        
        if (intervalActual === intervalSeconds.value) {
    
            EndSound.play()
    
        }
    
    }
    
    
    
    function ChangeState() {
        
        clickSound.play()
        
        if (pause) {
    
            actualTimeMins = inputMinutes.value;
            actualTimeSecs = inputSecs.value;
    
            intervalId = setInterval(DownTime, 1000);
            handlerId = setInterval(handlerTime, 100);
    
            setPause(false)
            mainButton.current.innerHTML = 'PAUSE';


            inputIntervalSee.current.setAttribute('style', 'display: block;')
            inputInterval.current.setAttribute('style', 'display: none;')
            
            IntervalText.current.innerHTML = 'Next point in'
            
            inputMinutes.current.disabled = true;
            inputSecs.current.disabled = true;
            
        } else {
            
            inputIntervalSee.current.setAttribute('style', 'display: none;')
            inputInterval.current.setAttribute('style', 'display: block;')
            
            IntervalText.current.innerHTML = 'Interval'

            var a = clearInterval(intervalId);
            // clearInterval(handlerId);
            setPause(true)
            
            mainButton.current.innerHTML = 'START'
            
            inputMinutes.current.disabled = false;
            inputSecs.current.disabled = false;
            
            
            
            inputMinutes.value = actualTimeMins;
            inputSecs.value = actualTimeSecs;
            
            
        }
    
    }
    
    
    
    
    function DownTime() {
        
    
        if (intervalActual === intervalSeconds.value) {
    
            intervalActual = 0;
    
        } else {
    
            intervalActual += 1;
    
        }
    
    
        if (actualTimeMins === 0 && actualTimeSecs === 0) {
    
            clearInterval(intervalId);
            // Timer.innerHTML = "00:00"
    
        } else {
            

            if (inputSecs.current.value >= 1) {
        
                inputSecs.current.value -= 1;
        
            } else {
        
                inputSecs.current.value = 59;
                
                if (inputMinutes.current.value >= 1) {
        
                    inputMinutes.current.value -= 1;
        
                }    
        
            }    
        

        }
        
        if (checkpoint) {

            if (inputIntervalSee.current.value > 0) {

                inputIntervalSee.current.value -= 1

            } else {

                inputIntervalSee.current.value = inputInterval.current.value
                EndSound.play()

            }

        }

        

        if (inputSecs.current.value > 9) {
            
            inputSecs.current.value = inputSecs.current.value;
    
        } else {
    
            inputSecs.current.value = `0${inputSecs.current.value}`
    
        }   



        

        if (inputMinutes.current.value.length > 1) {

            inputMinutes.current.value = inputMinutes.current.value;
    
        } else {
    
            inputMinutes.current.value = `0${inputMinutes.current.value}`
    
        }  
    

    }


    function OnChangeMinutes(e) {

        
        if (inputMinutes.current.value.length > 1) {
            
            
            if (inputMinutes.current.value.substr(0, 1) === '0') {
                inputMinutes.current.value = inputMinutes.current.value.substr(1, 3);

            } else {
                
                inputMinutes.current.value = `${inputMinutes.current.value.substr(0, 3)}`;
        
            }


        } else {
    
            if (inputMinutes.current.value <= 9) {

                inputMinutes.current.value = `0${inputMinutes.current.value}`

            }
    
        }   
    


        if (inputMinutes.current.value > 999) {

            inputMinutes.current.value = 999;

        } else if (inputMinutes.current.values < 0) {
            
            inputMinutes.current.value = '00';

        }

    }


    function OnChangeSeconds(e) {    
        if (inputSecs.current.value.length > 1) {
            
            
            if (inputSecs.current.value.substr(0, 1) === '0') {
                inputSecs.current.value = inputSecs.current.value.substr(1, 2);

            } else {
                
                inputSecs.current.value = `${inputSecs.current.value.substr(1, 2)}`;
        
            }


        } else {
    
            if (inputSecs.current.value <= 9) {

                inputSecs.current.value = `0${inputSecs.current.value}`

            }
    
        }   


        

        

        if (inputSecs.current.value > 60) {

            inputSecs.current.value = 60;

        } else if (inputSecs.current.values < 0) {
            
            inputSecs.current.value = '00';

        }


    }    
    



    function intervalChange(e) {

        inputIntervalSee.current.value = e.target.value

    }



    function CheckPointsChange() {

        clickSound.play()

        if (checkpoint) { // Se desactiva.

            checkpointObject.current.src = Check
            setChekpoint(false)
            
        } else { // Se activa.
            
            setChekpoint(true)
            checkpointObject.current.src = CheckFill

        }

    }



    function InfoOnClik() {

        clickSound.play()

        if (checkpointInfoOpen) {

            CheckPointObj.current.setAttribute('style', 'display: none;')
            setChekpointInfoOpen(false)
            
        } else {
            
            CheckPointObj.current.setAttribute('style', 'display: block;')
            setChekpointInfoOpen(true)

        }

    }


    function OnEnterCheckpoint() {

        CheckPointObj.current.setAttribute('style', 'display: block;')
        setChekpointInfoOpen(true)

    }


    function OnLeaveCheckpoint() {
        
        CheckPointObj.current.setAttribute('style', 'display: none;')
        setChekpointInfoOpen(false)

    }


    function OnAcceptOptions() {

        clickSound.play()

        if (openSettings) {

            configDiv.current.setAttribute('style', 'display: none;')
            timerDivs.current.setAttribute('style', 'filter: blur(0px)')
            setOpenSettings(false)
            
        } else {
            
            configDiv.current.setAttribute('style', 'display: flex;')
            timerDivs.current.setAttribute('style', 'filter: blur(5px)')
            setOpenSettings(true)

        }

    }
    
    var IntervalText = useRef(null)
    





    var inputIntervalSee = useRef(null);
    var inputInterval = useRef(null);
    var configDiv = useRef(null);


    var checkpointObject = useRef(null);
    var CheckPointObj = useRef(null);
    const [checkpointInfoOpen, setChekpointInfoOpen] = useState(false)
    const [checkpoint, setChekpoint] = useState(false)
    const [openSettings, setOpenSettings] = useState(false)


    var timerDivs = useRef(null);


    var ButtonMain = 'START'
        
    const [pause, setPause] = useState(true);

    var mainButton = useRef(null);

    var inputMinutes = useRef(null)
    var inputSecs = useRef(null)
    
    

    var intervalSeconds = useRef(null)
    
    var intervalActual = 0;

    var TimerText = useRef(null)


    var clickSound = new Audio(ClickSoundM)
    var EndSound = new Audio(EndSoundM)

    var actualTimeMins;
    var actualTimeSecs;


    var handlerId;




    var minsText = 0;
    var secsText = 0;
    
    





    return (

        <div className="pomodoroDiv">

            <div id="timeInputsDivs" ref={timerDivs}>

                {checkpoint ? (

                    <div className="Interval">

                        <input type="number" name="interval" className="interval" defaultValue={120} ref={inputInterval} onChange={intervalChange} />
                        <input type="number" name="interval" className="interval noUserInterval" defaultValue={120} ref={inputIntervalSee} disabled='true' />
                        <p className="intervalP" ref={IntervalText}>Interval</p>

                    </div>

                ) : (<p></p>)}

                <input type="number" name="timeMinutes" id="timeMinutes" ref = {inputMinutes} defaultValue='09' onChange={OnChangeMinutes} min='0' maxLength='11' style={{'width': '350px', 'textAlign': 'right'}} />
                
                <p id="Timer">:</p>

                <input type="number" name="timeSecs" id="timeSecs" ref={inputSecs} defaultValue='31' onChange={OnChangeSeconds} style={{'width': '350px'}} />

                <p className="ModeText">Pomodoro Mode</p>


                {/* <label for="intervalSeconds">interval Seconds</label> */}
                {/* <input type="number" name="intervalSeconds" id="intervalSeconds" value = '120' ref={intervalSeconds} /> */}

            </div>


            {/* ¿Por qué al usar un input con un valor predefinido en react no deja ajustarlo manualmente? */}

            <div className="buttonsDiv">

                <button ref = {mainButton} id="Button" onClick={ChangeState}>{ButtonMain}</button>
                <button id="Button" onClick={OnAcceptOptions} >CONFIG</button>

            </div>


            <div className="configDiv" ref={configDiv} >

                <div className="optionsDiv">

                    <div className="titleDiv">

                        <p className="ConfigTitle">TIMER CONFIG</p>

                    </div>


                    <div className="mainConfDiv">


                        {/* ----------------------------- */}                        
                        <div className="optionType">

                            <div className="optionBase" ref={CheckPointObj} >

                                <div className="optionInfoDiv">

                                    <p className="optionInfoTex">

                                        In checkpoint mode, you can set a checkpoint every X amount of time. Useful for testing and speed practice. You can use it in pomodoro mode and timer mode.

                                    </p>

                                </div>

                            </div>


                            <div className="optionsContainer">

                                <div className="optionNameDiv">

                                    <p className="OptionName">CheckPoints Mode</p>
                                    <span className="material-symbols-outlined" onClick={InfoOnClik}  onMouseEnter={OnEnterCheckpoint} onMouseLeave={OnLeaveCheckpoint} >
                                        info
                                    </span>

                                </div>


                                <img src={Check} className="checkImg" onClick={CheckPointsChange} ref={checkpointObject} />

                            </div>
                            

                        </div>
                        {/* ----------------------------- */}


                    </div>

                    <button id="Button" onClick={OnAcceptOptions}>ACCEPT</button>

                </div>

            </div>

        </div>

    )

}



export default NewTimer;