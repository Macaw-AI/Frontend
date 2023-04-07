import { useConversationHistory } from "../hooks/useConversationHistory";
import React from "react";
import { renderHook, act } from '@testing-library/react-hooks'
import {error} from "console"

test("test1", () => {

    const {result,rerender} = renderHook(() => useConversationHistory("teacher","student"))
    let recentConversationLines = ""
    act(() =>{

        result.current.addTeacherResponse("T1")
        result.current.addTeacherResponse("T2")
        recentConversationLines = result.current.getRecentConversationLines(6)
    })
    expect(recentConversationLines).toBe("adsfgh")
})