
public interface IFibonacci
{
    public int[] SequenceArray { get; }
    public int LogTime { get; }
}


public class Fibonacci : IFibonacci
{
    int[] sequenceArray;
    int logTime;
    
    public int[] SequenceArray { get => sequenceArray; }
    public int LogTime { get => logTime; }

    public Fibonacci(int size)
    {
        sequenceArray = new int[size];
        for (int i = 0; i < size; i++)
        {
            if (i<2)
            {
                sequenceArray[i] = i;
            }
            else
            {
                sequenceArray[i] = sequenceArray[i - 1] + sequenceArray[i-2];
            }
        }
        logTime = 1 + (int)Math.Log2(size);
    }
}