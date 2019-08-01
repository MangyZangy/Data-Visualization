import matplotlib.pyplot as plt
import numpy as np
from mpl_toolkits.mplot3d import Axes3D
import time
# from flask import Flask, render_template


filename = '/Users/imacbig01/PycharmProjects/Data_vis/vector/data_send/data.csv'

starttime = time.time()
while True:
    with open('/Users/imacbig01/PycharmProjects/Data_vis/vector/data_send/data.csv', 'r') as fin:
        data = fin.read().splitlines(True)
    with open('/Users/imacbig01/PycharmProjects/Data_vis/vector/data_send/data.csv', 'w') as fout:
        fout.writelines(data[1:])

    x = []
    y = []
    z = []

    _data = np.loadtxt(filename, delimiter=',', dtype=float)

    for row in _data:
        x.append(float(row[0]))
        y.append(float(row[1]))
        z.append(float(row[2]))

    total = x + y
    direction = (sum(total) / len(total))
    depth = (np.mean(z))

# Gets value of variables from datavis.py
# Also gets average of array and rounds them into integers

    x = np.mean(x)
    x = round(x)

    y = np.mean(y)
    y = round(y)

    z = round(depth)

    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')

    p = [x, y, z]

    origin = [0, 0, 0]
    X, Y, Z = zip(origin)
    U, V, W = zip(p)

    ax.set_xlabel('North')
    ax.set_ylabel('East')
    ax.set_zlabel('Depth')

    ax.set_xlim([0, 60000])
    ax.set_ylim([0, 9000])
    ax.set_zlim([-60000, 0])

    plt.title('ESP Vector', fontsize=10)

    print("refreshed")
    ax.quiver(X, Y, Z, U, V, W, arrow_length_ratio=0.15, color="red", label="ESP Vector", linewidth=4)
    fig.savefig('3D_Vector_Arrow.png', bbox_inches='tight')
    # plt.show()

    f = open(filename, "w+")
    f.close()

    time.sleep(5.0 - (time.time() % 5.0))
