import { Box, SxProps, Theme  } from '@mui/material'
import React, { ReactElement, useState } from 'react'

type Props = {
  title: string,
  subText: string,
  children: ReactElement,
  showToggleButton?: boolean
  emp?: string
  sx?: SxProps<Theme>
}

export default function SettingSection({title, subText, children, showToggleButton=true, emp, sx}: Props) {
  const [showContent, setShowContent] = useState(false);

  const showInnerContent = () => {
    if(showToggleButton) {
      setShowContent(!showContent)
    }
  }

  return (
    <Box className="manrope-font" sx={{...sx, background: '#fff', padding: '20px'}}>
      <Box onClick={showInnerContent}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box sx={{color: '#2E2C34', fontSize: '14px', fontWeight: '600'}}>
            <span>{title}</span>
          </Box>

          {
            showToggleButton && 
            <Box sx={{color: '#034459', border: 'solid #E6ECEE 2px', paddingX: '10px', paddingY: '2px', borderRadius: '5px', fontWeight: '500', background: '#F6FAFB', fontSize: '12px' }}>
              <span>{showContent ? 'Hide' : 'Show'}</span>
            </Box>
          }
        </Box>
        <Box sx={{color: '#84818A', fontSize: '14px', mt: '10px'}}>
          {/* password form */}
          <span>{subText}</span>

          <span style={{fontWeight: '500'}}>{emp}</span>
        </Box>
      </Box>
      <Box>
        {
          showToggleButton ? showContent && children : children
        }
      </Box>
    </Box>
  )
}
