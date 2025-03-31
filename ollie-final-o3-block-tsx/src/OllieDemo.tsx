import { motion } from 'framer-motion';
import { useState } from 'react';

const OllieDemo = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStartAnimation = () => {
    setIsAnimating(true);
    // 1.2 秒后重置动画状态
    setTimeout(() => setIsAnimating(false), 1200);
  };

  // 滑板整体动画
  const boardAnimation = {
    y: isAnimating ? [-5, 0, -60, -40, 0] : 0,
    rotate: isAnimating ? [0, 0, -15, -10, 0] : 0,
  };

  // 小人儿整体动画（身体 + 头部 + 腿的相对位移）
  const personAnimation = {
    y: isAnimating ? [-5, 0, -100, -60, 0] : 0,
    rotate: isAnimating ? [0, 0, -5, -3, 0] : 0, // 轻微倾斜，模拟起跳时身体的姿势
  };

  // 左腿动画：弯曲时往前抬一点
  const leftLegAnimation = {
    rotate: isAnimating ? [0, 0, 30, 15, 0] : 0,
  };

  // 右腿动画：弯曲时往后抬一点
  const rightLegAnimation = {
    rotate: isAnimating ? [0, 0, -30, -15, 0] : 0,
  };

  const transition = {
    duration: 1.2,
    ease: 'easeOut',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">滑板起跳演示</h1>

      <div className="relative w-full max-w-md h-[400px] flex items-center justify-center">
        {/* 滑板 */}
        <motion.div
          className="absolute bottom-0 w-48 h-4"
          animate={boardAnimation}
          transition={transition}
          style={{ transformOrigin: 'center' }}
        >
          {/* 滑板主体（矩形 + 圆角） */}
          <div className="relative w-full h-full bg-gray-800 rounded-full" />

          {/* 轮子：4 个圆形，通过 absolute 定位到滑板前后左右 */}
          {/* 前左轮子 */}
          <div
            className="absolute w-4 h-4 bg-black rounded-full"
            style={{ left: '4px', bottom: '-6px' }}
          />
          {/* 前右轮子 */}
          <div
            className="absolute w-4 h-4 bg-black rounded-full"
            style={{ right: '4px', bottom: '-6px' }}
          />
          {/* 后左轮子 */}
          <div
            className="absolute w-4 h-4 bg-black rounded-full"
            style={{ left: '4px', bottom: '10px' }}
          />
          {/* 后右轮子 */}
          <div
            className="absolute w-4 h-4 bg-black rounded-full"
            style={{ right: '4px', bottom: '10px' }}
          />
        </motion.div>

        {/* 小人儿 */}
        <motion.div
          className="absolute bottom-4 flex flex-col items-center"
          animate={personAnimation}
          transition={transition}
          style={{ transformOrigin: 'bottom center' }}
        >
          {/* 小人儿容器：相对定位，方便头、身体、腿绝对定位 */}
          <div className="relative w-12 h-32">
            {/* 头部：圆形 */}
            <div className="absolute w-6 h-6 bg-gray-800 rounded-full" style={{ top: 0, left: '3px' }} />

            {/* 身体：中间一根“棍” */}
            <div
              className="absolute w-2 bg-gray-800"
              style={{ top: '6px', left: '5px', height: '16px', borderRadius: '1px' }}
            />

            {/* 左腿：通过 motion.div 控制旋转（弯曲） */}
            <motion.div
              className="absolute w-2 h-12 bg-gray-800"
              style={{
                bottom: 0,
                left: 0,
                borderRadius: '1px',
                transformOrigin: 'top left',
              }}
              animate={leftLegAnimation}
              transition={transition}
            />

            {/* 右腿：通过 motion.div 控制旋转（弯曲） */}
            <motion.div
              className="absolute w-2 h-12 bg-gray-800"
              style={{
                bottom: 0,
                left: '6px',
                borderRadius: '1px',
                transformOrigin: 'top right',
              }}
              animate={rightLegAnimation}
              transition={transition}
            />
          </div>
        </motion.div>
      </div>

      {/* 控制按钮 */}
      <motion.button
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStartAnimation}
        disabled={isAnimating}
      >
        {isAnimating ? '起跳中...' : '开始起跳'}
      </motion.button>
    </div>
  );
};

export default OllieDemo;
