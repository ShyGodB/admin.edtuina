const checkHomeData = (homeData) => {
    const tmpToday = homeData.today
    const tmpYesterday = homeData.yesterday
    const tmpSeven = homeData.week
    const tmpClient = homeData.total
    const today = [
        {
            name: '交易额',
            value: tmpToday.turnover
        },
        {
            name: '总单量',
            value: tmpToday.totalOrder
        },
        {
            name: '超时单',
            value: tmpToday.overTimeOrder
        },
        {
            name: '用户取消',
            value: tmpToday.cancelOrder
        },
        {
            name: '交通费',
            value: tmpToday.transFee
        },
        {
            name: '优惠卷',
            value: tmpToday.couponFee
        }
    ]
    const seven = {
        day: tmpSeven.map(item => item.time),
        orders: tmpSeven.map(item => item.totalOrder),
        pay: tmpSeven.map(item => item.turnover)
    }
    const yesterday = [
        {
            name: '交易额',
            value: tmpYesterday.turnover
        },
        {
            name: '总单量',
            value: tmpYesterday.totalOrder
        },
        {
            name: '超时单',
            value: tmpYesterday.overTimeOrder
        },
        {
            name: '用户取消',
            value: tmpYesterday.cancelOrder
        },
        {
            name: '交通费',
            value: tmpYesterday.transFee
        },
        {
            name: '优惠卷',
            value: tmpYesterday.couponFee
        }
    ]
    const userCount = homeData.userCount
    const techCount = homeData.techCount
    const client = [
        {
            name: '总交易额',
            value: tmpClient.turnover
        },
        {
            name: '总盈利额',
            value: tmpClient.benefit
        },
        {
            name: '总单量',
            value: tmpClient.allOrder
        },
        {
            name: '总成功单',
            value: tmpClient.successOrder
        },
        {
            name: '总取消单',
            value: tmpClient.cancelOrder
        },
        {
            name: '总超时单',
            value: tmpClient.overTimeOrder
        },
        {
            name: '交通费',
            value: tmpClient.transFee
        },
        {
            name: '优惠卷',
            value: tmpClient.couponFee
        }
    ]
    return {
        today,
        seven,
        yesterday,
        userCount,
        techCount,
        client
    }
}

export default {
    checkHomeData
}
