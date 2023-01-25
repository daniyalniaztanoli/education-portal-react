import { useState, useContext } from 'react'
import { Textarea, IconButton, Button, useColorModeValue, Select, Heading, Divider, Input, Stack, Box, Spacer } from '@chakra-ui/react'
import Form from '../formikInput'
import CodeBlocks from '../codeBlock'
import { BsStar, BsStarFill } from 'react-icons/bs'

import axios from 'axios'
import { GlobalContext } from '../../context/context'
import useBookmark from '../../hooks/useBookmark'

const supportedLanguage = ['html', 'css', 'javascript', 'js', 'jsx', 'json', 'text', 'typescript', 'ts', 'tsx', 'python']

const CodeForm = ({ handleBlock }) => {
    const { state, dispatch } = useContext(GlobalContext)
    const [addBookmark, removeBookmark] = useBookmark()
    const [codeTitle, setCodeTitle] = useState('')
    const [selectedLang, setSelectedLang] = useState('')
    const [codeBlock, setCodeBlock] = useState('')

    const handleData = async (e) => {
        e.preventDefault()
        const [select, tit, code] = e.target
        if (!select.value || !tit.value || !code.value) {
            return
        }
        try {
            const res = await axios.post(`${state.api}docs/code`, {
                codeTitle,
                codeBlock,
                codeLang: selectedLang,
                contentType: 'code',
                classId: state.classId
            })
            console.log(res.data.doc);
            dispatch({
                type: 'docs',
                payload: [res.data.doc, ...state.docs]
            })
        } catch (error) {
            console.log(error.message);
        }


        // setBlocks([...blocks, { codeText: codeBlock, selectedLang, title }])
    }

    const bg_c = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')
    const focus = { bg: 'whiteAlpha.300' }

    return (
        <>
            <form onSubmit={handleData}>
                <Select
                    bg={bg_c}
                    _focus={focus}
                    border={0}

                    my='1'
                    placeholder='Select Language'
                    onChange={(e) => setSelectedLang(e.target.value)}
                    value={selectedLang} >
                    {
                        supportedLanguage.map((lang, index) => {
                            return <option key={index} value={lang} >{lang}</option>
                        })
                    }
                </Select>

                <Input
                    bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                    border={0}
                    _focus={{
                        bg: 'whiteAlpha.300',
                    }}
                    id="codeTitle"
                    name="codeTitle"
                    value={codeTitle}
                    onChange={(e) => setCodeTitle(e.target.value)}
                    placeholder="Enter Code Title Here..."
                />

                <Textarea
                    value={codeBlock}
                    onChange={(e) => setCodeBlock(e.target.value)}
                    placeholder='Insert Your Code Here'
                    size='sm'
                    my={1}
                    border={0}
                    bg={bg_c}
                    _focus={focus}
                />
                <Stack  >
                    <Button type='submit' >Add Code</Button>
                    <Button onClick={() => handleBlock(false)} >Go Back</Button>
                </Stack>
            </form>
            {
                state?.docs?.map((block, index) => {
                    if (block.contentType === 'code') {
                        return <div key={index} >
                            <Stack direction={'row'} alignItems='center' my={2} >
                                <Heading as='h4' size='md' >
                                    {block.codeTitle}
                                </Heading>
                                <Spacer />
                                {state.user ? state?.user?.bookmark?.indexOf(block._id) > -1 ?
                                    <IconButton color={'orange.400'} icon={<BsStarFill />} onClick={() => removeBookmark(block._id)} /> :
                                    <IconButton icon={<BsStar />} onClick={() => addBookmark(block._id)} /> : null
                                }
                            </Stack>
                            <CodeBlocks code={block.codeBlock} language={block.codeLang} />
                            <Divider mt={3} />
                        </div>
                    }
                })
            }
        </>
    )
}

export default CodeForm