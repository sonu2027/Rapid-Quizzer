import React from 'react'
import { CButton, CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import 'bootstrap/dist/css/bootstrap.min.css';

export const BasicCard=({setStartQuiz}) => {
  return (
    <div className='flex justify-center items-center'>
      <CCard className="mt-4 mx-4">
        <CCardBody>
          <CCardTitle>Pseudo Code</CCardTitle>
          <CCardText>
            Play your first quiz and know where you stand
          </CCardText>
          <CButton onClick={()=>setStartQuiz(true)} color="primary" href="#">
            Play quiz
          </CButton>
        </CCardBody>
      </CCard>
    </div>
  )
}
