import React from 'react'
import styled from 'styled-components'
import { AccountButton } from '../components/account/AccountButton'
import { Container, MainContent, Section, SectionRow } from '../components/base/base'
import { BuildConfig } from '../components/Demo/tDec_and_conditions_demo'
import { Title } from '../typography/Title'
import { Text } from '../typography/Text'

export const DemoAliceGrants = () => {
  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>TDec Demo</Title>
            <AccountButton />
          </SectionRow>
          <SectionRow>
            <Text>Define a tDec configuration and use it to encrypt and decrypt</Text>
          </SectionRow>
          <TableGrid>
            <BuildConfig />
          </TableGrid>
        </Section>
      </Container>
    </MainContent>
  )
}

const TableGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`
