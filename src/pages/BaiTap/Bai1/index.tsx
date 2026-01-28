import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Alert, Typography, Space } from 'antd';

const { Title, Text } = Typography;

const Bai1 = () => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info' | 'warning', content: string } | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Hàm sinh số ngẫu nhiên khi bắt đầu hoặc chơi lại
  const startNewGame = () => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(randomNum);
    setAttempts(0);
    setMessage(null);
    setGuess('');
    setGameOver(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleGuess = () => {
    const numGuess = parseInt(guess);
    if (isNaN(numGuess)) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (numGuess === targetNumber) {
      setMessage({ type: 'success', content: 'Chúc mừng! Bạn đã đoán đúng!' });
      setGameOver(true);
    } else if (newAttempts >= 10) {
      setMessage({ type: 'error', content: `Bạn đã hết lượt! Số đúng là ${targetNumber}.` });
      setGameOver(true);
    } else if (numGuess < targetNumber) {
      setMessage({ type: 'warning', content: 'Bạn đoán quá thấp!' });
    } else {
      setMessage({ type: 'warning', content: 'Bạn đoán quá cao!' });
    }
    
    setGuess('');
  };

  return (
    <Card title="Bài 1: Trò chơi đoán số (1 - 100)">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong>Lượt đoán: {attempts}/10</Text>
        
        <Space>
          <Input 
            type="number" 
            value={guess} 
            onChange={(e) => setGuess(e.target.value)} 
            disabled={gameOver}
            placeholder="Nhập số dự đoán"
            onPressEnter={handleGuess}
          />
          <Button type="primary" onClick={handleGuess} disabled={gameOver || !guess}>
            Đoán
          </Button>
          <Button onClick={startNewGame}>Chơi lại</Button>
        </Space>

        {message && (
          <Alert message={message.content} type={message.type} showIcon />
        )}
      </Space>
    </Card>
  );
};

export default Bai1;