import dayjs from 'dayjs'
import IsSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import IsSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import utc from 'dayjs/plugin/utc'
import isBetween from 'dayjs/plugin/isBetween'

import { AppointmentsRequestSql } from '@appointmentsAPI/types/appointmentRequestSql'

dayjs.extend(IsSameOrBefore)
dayjs.extend(utc)
dayjs.extend(isBetween)
dayjs.extend(IsSameOrAfter)

export const existConflict = (
  interval: AppointmentsRequestSql[],
  dataTimeStart: string,
  dataTimeEnd: string,
) => {
  if (interval.length === 0) {
    return false
  } else if (interval.length === 1) {
    console.log('devolveu um do banco')

    const intervalLastIsSameRequest =
      dayjs.utc(interval[0].dataTimeStart).isSame(dataTimeStart) &&
      dayjs.utc(interval[0].dataTimeEnd).isSame(dataTimeEnd)
    // As datas da requisição e do BD são IGUAIS

    if (intervalLastIsSameRequest) {
      return true
    }

    const dateIstAfterLastAppointment = // TUDO ISSO VERIFICA SE O AGENDAMENTO É DEPOIS DO UNICO AGENDAMENTO
      dayjs(dataTimeStart).isSameOrAfter(interval[0].dataTimeEnd) && // a data inicial da request é igual ou posterior da data final do agendamento do DB
      dayjs(dataTimeEnd).isAfter(interval[0].dataTimeEnd) // a data final da request é igual ou posterior da data final do agendamento do DB

    const dateIsBeforeLastAppointment = // TUDO ISSO VERIFICA SE O AGENDAMENTO É ANTES DO UNICO AGENDAMENTO
      dayjs(dataTimeStart).isBefore(interval[0].dataTimeStart) && // a data inicial da request é anterior da data inicial do agendamento do DB
      dayjs(dataTimeEnd).isSameOrBefore(interval[0].dataTimeStart) // a dat

    return !(dateIstAfterLastAppointment || dateIsBeforeLastAppointment)
  }

  console.log('devolveu dois')
  const [intervalLast, intervalNext] = interval // Separa os dois cadastros

  const intervalLastAndNextIsSameRequest = // Verifica se as datas da REQUEST JÁ EXISTEM NO BD
    (dayjs.utc(intervalLast.dataTimeStart).isSame(dataTimeStart) &&
      dayjs.utc(intervalLast.dataTimeEnd).isSame(dataTimeEnd)) ||
    (dayjs.utc(intervalNext.dataTimeStart).isSame(dataTimeStart) &&
      dayjs.utc(intervalNext.dataTimeEnd).isSame(dataTimeEnd))

  if (intervalLastAndNextIsSameRequest) {
    return true
  }

  if (intervalLast.id === intervalNext.id) {
    // Se trazer o mesmo id, como next e last e ele vai verificar se a nova data vai cadastrar ou no futuro/passado desse agendamento
    const startAndEndRequestIsBeforeOrAfterAtUniqueResult = !(
      (dayjs(dataTimeStart).isSameOrAfter(interval[0].dataTimeEnd) &&
        dayjs(dataTimeEnd).isAfter(interval[0].dataTimeEnd)) ||
      (dayjs(dataTimeStart).isBefore(interval[0].dataTimeStart) &&
        dayjs(dataTimeEnd).isSameOrBefore(interval[0].dataTimeStart))
    )

    return startAndEndRequestIsBeforeOrAfterAtUniqueResult
  }

  const startAndEndIsBetweenTheLastAndNextAppointment = // Verifica se a data ANTES DO Last e o Next
    !(
      dayjs(dataTimeStart).isBetween(
        dayjs(interval[0].dataTimeEnd),
        dayjs(interval[1].dataTimeStart),
      ) ||
      dayjs(dataTimeEnd).isBetween(
        dayjs(interval[0].dataTimeEnd),
        dayjs(interval[1].dataTimeStart),
        'minute',
        '[]',
      )
    )

  console.log(
    startAndEndIsBetweenTheLastAndNextAppointment,
    '\nlast\n',
    intervalLast.id,
    intervalLast.type,
    intervalLast.dataTimeStart,
    intervalLast.dataTimeEnd,
    '\nnext\n',
    intervalNext.id,
    intervalNext.type,
    intervalNext.dataTimeStart,
    intervalNext.dataTimeEnd,
  )
  return startAndEndIsBetweenTheLastAndNextAppointment
}
