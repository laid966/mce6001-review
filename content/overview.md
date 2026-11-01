## 🗺️ 题型地图：作业 → 考点 → 套路

> 考试大概率复刻作业题型。下表把 **10 道作业题** 映射到课件章节与解题套路，复习时按行过一遍：先自己做，再点开答案对照。

| # | 题型 | 作业出处 | 课件 | 一句话套路 |
|---|------|----------|------|------------|
| 1 | 均方收敛充要条件证明 | 作业1 P1 | Part 2 | 展开 $E[(S_n-S_m)^2]$，独立零均值消交叉项，双向套 Cauchy 准则 |
| 2 | 特征函数 + 四种收敛判定 | 作业1 P2 | Part 2 | 独立和特征函数相乘；$(\cos\frac{u}{\sqrt n})^n \to e^{-u^2/2}$；否 a.s. 用增量不趋于 0 |
| 3 | Chernoff / 尾概率界 | 作业1 P3 | Part 1–2 | 事件指数化 + Markov + 对 $t$ 求导优化 |
| 4 | 连续映射定理与反例 | 作业1 P4 | Part 2 | 连续函数保收敛；不连续点用 $(-1)^n/n$ 横跳反例 |
| 5 | 三角/幂次序列收敛性 | 作业1 P5 | Part 2 | $\cos(n\Theta)$ 正交性 + 同分布；$|W|^n$ 几何衰减 |
| 6 | 联合高斯三问 | 作业2 P1 | Part 3 | 条件均值/方差公式；误差与观测不相关⇒独立 |
| 7 | 新息序列与正交 MMSE | 作业2 P2 | Part 3 | Gram–Schmidt 逐步减预测；对角协方差下系数逐项求 |
| 8 | 条件期望基本性质 | 作业2 P3 | Part 3 | $X=g(U) \Rightarrow E[X|U]=X$，MSE=0 |
| 9 | 线性 MMSE（带帽估计） | 作业2 P4 | Part 3 | $\widehat E[X|Y]=\mu_X+\frac{\mathrm{Cov}}{\mathrm{Var}(Y)}(Y-\mu_Y)$；$\mathrm{Cov}(X,X+N)=\mathrm{Var}(X)$ |
| 10 | 标量 Kalman 滤波 | 作业2 P5 | Part 4 | 更新-预测两步模板 + 方差 Riccati 递推，背熟 |

## 📌 四种收敛关系速记

$$a.s. \Rightarrow p \Rightarrow d, \qquad m.s. \Rightarrow p \Rightarrow d$$

- 反之**都不成立**（作业1 P2/P4/P5 全是反例素材）。
- $m.s.$ 收敛 $\Leftrightarrow$ Cauchy 准则：$\lim_{m,n\to\infty} E[(X_n-X_m)^2]=0$（不需要知道极限）。
- 依分布收敛 $\Leftrightarrow$ 特征函数逐点收敛到某**在 0 处连续**的函数（Lévy 连续性定理）。
- 有界序列：依概率收敛 $\Rightarrow$ 均方收敛（作业1 P5(a) 否 p 的钥匙）。

## 🧭 复习路线建议（考前 5 天）

1. **Day 1**：过 Part 1–2 总结 + 作业1 P1–P3（收敛性证明三件套）。
2. **Day 2**：作业1 P4–P5 + 反例库（横跳序列、Rademacher 和、$\cos n\Theta$）。
3. **Day 3**：Part 3 总结 + 作业2 P1–P3（联合高斯与新息）。
4. **Day 4**：作业2 P4–P5（线性 MMSE 与 Kalman 模板默写）。
5. **Day 5**：公式速查表过三遍 + 把 10 道题盖住答案重做一遍。
