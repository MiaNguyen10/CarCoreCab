/* eslint-disable no-console */
import { Box, Tab, Tabs } from '@mui/material'
import { ListTypo } from 'app/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  CarLabelStep1,
  CarLabelStep2,
  CarLabelStep3,
  CarLabelStep4,
  CarLabelStep5,
  CarLabelStep6,
} from 'app/pages/carPage/components'
import { ICarInformation } from '../types'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

interface ICarLabelProps {
  carInformation: ICarInformation
  onFormSubmit: (data?: ICarInformation) => void
  onApproveCar: () => Promise<void>
  onDisapproveCar: () => Promise<void>
  onWithdrawCar: () => Promise<void>
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const CarLabel = ({
  carInformation,
  onFormSubmit,
  onApproveCar,
  onDisapproveCar,
  onWithdrawCar,
}: ICarLabelProps): JSX.Element => {
  const { t } = useTranslation()
  const [value, setValue] = React.useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeTab = (newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <ListTypo desc={` ${t('CAR_CAR_LABELING')}`} />
      <Box sx={{ borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label={` ${t('CAR_CAR_LABELING_STEP_1')}`} {...a11yProps(0)} />
          <Tab label={` ${t('CAR_CAR_LABELING_STEP_2')}`} {...a11yProps(1)} />
          <Tab label={` ${t('CAR_CAR_LABELING_STEP_3')}`} {...a11yProps(2)} />
          <Tab label={` ${t('CAR_CAR_LABELING_STEP_4')}`} {...a11yProps(3)} />
          <Tab label={` ${t('CAR_CAR_LABELING_STEP_5')}`} {...a11yProps(4)} />
          <Tab label={` ${t('CAR_CAR_LABELING_STEP_6')}`} {...a11yProps(5)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <CarLabelStep1 carInformation={carInformation} onChangeTab={handleChangeTab} onFormSubmit={onFormSubmit} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CarLabelStep2 carInformation={carInformation} onChangeTab={handleChangeTab} onFormSubmit={onFormSubmit} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CarLabelStep3 carInformation={carInformation} onChangeTab={handleChangeTab} onFormSubmit={onFormSubmit} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CarLabelStep4 carInformation={carInformation} onChangeTab={handleChangeTab} onFormSubmit={onFormSubmit} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <CarLabelStep5 carInformation={carInformation} onChangeTab={handleChangeTab} onFormSubmit={onFormSubmit} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <CarLabelStep6
          onFormSubmit={onFormSubmit}
          onApproveCar={onApproveCar}
          onDisapproveCar={onDisapproveCar}
          onWithdrawCar={onWithdrawCar}
        />
      </TabPanel>
    </Box>
  )
}

export default CarLabel

