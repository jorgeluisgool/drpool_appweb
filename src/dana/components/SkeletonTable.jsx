import React from 'react'

export const SkeletonTable = ({mensaje}) => {
    return (
        <div role="status" className="animate-pulse">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                <thead className="bg-[#245A95] text-white uppercase">
                    <tr className='text-left'>
                        <th scope="col" className="relative px-6 py-3">
                            <div className="items-center pl-12">
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            </div>
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <div className="items-center">
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            </div>
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <div className="items-center">
                                <span><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div></span>
                            </div>
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <div className="items-center">
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            </div>
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <div className="items-center">
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200" >
                    {/* <tr className='cursor-pointer hover:bg-[#E2E2E2]'>
                        <td className="px-6">
                            <div className="flex items-center">
                                <div className="ml-8">
                                    <div className="text-sm font-medium text-gray-900 cursor-pointer">
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                </div>
                            </div>
                        </td>
                    </tr> */}
                    <tr className='cursor-pointer hover:bg-[#E2E2E2]'>
                        {/* <td className="px-6">
                            <div className="flex items-center">
                                <div className="ml-8">
                                    <div className="text-sm font-medium text-gray-900 cursor-pointer">
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                    </div>
                                </div>
                            </div>
                        </td> */}
                        {/* <td className="px-6">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                </div>
                            </div>
                        </td> */}
                        <td className="px-6">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                </div>
                                <p className='text-[#245A95] font-semibold text-base py-3'>{mensaje}</p>
                            </div>
                        </td>
                        {/* <td className="px-6">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                </div>
                            </div>
                        </td> */}
                        {/* <td className="px-6">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                </div>
                            </div>
                        </td> */}
                    </tr>
                    {/* <tr className='cursor-pointer hover:bg-[#E2E2E2]'>
                        <td className="px-6">
                            <div className="flex items-center">
                                <div className="ml-8">
                                    <div className="text-sm font-medium text-gray-900 cursor-pointer">
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                </div>
                            </div>
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}
